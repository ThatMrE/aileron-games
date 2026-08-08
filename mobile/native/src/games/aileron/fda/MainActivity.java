package games.aileron.fda;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.DialogInterface;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.JsResult;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/**
 * A single-activity WebView shell around the bundled game.
 *
 * The whole game lives in assets/ and is loaded from file:///android_asset,
 * so this app makes no network requests and declares no permissions.
 */
public class MainActivity extends Activity {

    private WebView web;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        web = new WebView(this);
        web.setBackgroundColor(Color.parseColor("#050812"));

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        // localStorage — this is what carries the gravesite from one
        // playthrough to the next. Without it that mechanic silently dies.
        s.setDomStorageEnabled(true);
        s.setAllowFileAccess(true);
        // the layout is a fixed-size pixel canvas plus flowing text; let the
        // page do its own scaling rather than the WebView second-guessing it
        s.setUseWideViewPort(false);
        s.setLoadWithOverviewMode(false);
        s.setBuiltInZoomControls(false);
        s.setSupportZoom(false);

        // Without a WebChromeClient the WebView silently swallows window.confirm()
        // and returns false. The game uses confirm() for "Restart the trail?",
        // so omitting this would make the Restart button quietly do nothing.
        web.setWebChromeClient(new GameChromeClient());
        web.setWebViewClient(new GameWebViewClient());

        web.loadUrl("file:///android_asset/index.html");
        setContentView(web);
    }

    /** Hands http(s) links to a real browser instead of navigating away from the bundle. */
    private boolean openExternally(String url) {
        if (url == null) return false;
        if (!url.startsWith("http://") && !url.startsWith("https://")) return false;
        try {
            startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url)));
        } catch (ActivityNotFoundException e) {
            // no browser installed; staying put beats crashing
        }
        return true;
    }

    private class GameWebViewClient extends WebViewClient {
        /*
         * Only the String overload is implemented. The WebResourceRequest
         * overload arrived in API 24 and this compiles against 23 — but that
         * is harmless, because WebViewClient's own API 24+ implementation of
         * the newer overload delegates to this one. It still fires on modern
         * Android.
         */
        @SuppressWarnings("deprecation")
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            return openExternally(url);
        }
    }

    private class GameChromeClient extends WebChromeClient {
        @Override
        public boolean onJsAlert(WebView view, String url, String message, final JsResult result) {
            new AlertDialog.Builder(MainActivity.this)
                    .setMessage(message)
                    .setPositiveButton(android.R.string.ok, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface d, int w) { result.confirm(); }
                    })
                    .setOnCancelListener(new DialogInterface.OnCancelListener() {
                        public void onCancel(DialogInterface d) { result.cancel(); }
                    })
                    .show();
            return true;
        }

        @Override
        public boolean onJsConfirm(WebView view, String url, String message, final JsResult result) {
            new AlertDialog.Builder(MainActivity.this)
                    .setMessage(message)
                    .setPositiveButton(android.R.string.ok, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface d, int w) { result.confirm(); }
                    })
                    .setNegativeButton(android.R.string.cancel, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface d, int w) { result.cancel(); }
                    })
                    .setOnCancelListener(new DialogInterface.OnCancelListener() {
                        public void onCancel(DialogInterface d) { result.cancel(); }
                    })
                    .show();
            return true;
        }
    }

    /**
     * Back button. The page owns the decision via window.__androidBack(), which
     * the Capacitor build uses too, so the two shells cannot drift apart:
     * it closes an open Sources/Reskins sheet and reports "closed", otherwise
     * reports "exit" and we confirm before discarding the playthrough.
     */
    @Override
    public void onBackPressed() {
        if (web == null) { super.onBackPressed(); return; }
        web.evaluateJavascript(
                "(function(){try{return (window.__androidBack&&window.__androidBack())||'exit';}"
                        + "catch(e){return 'exit';}})()",
                new ValueCallback<String>() {
                    @Override
                    public void onReceiveValue(String value) {
                        // evaluateJavascript returns a JSON string, quotes included
                        if (value != null && value.contains("closed")) return;
                        confirmLeave();
                    }
                });
    }

    private void confirmLeave() {
        new AlertDialog.Builder(this)
                .setTitle(R.string.leave_title)
                .setMessage(R.string.leave_body)
                .setPositiveButton(R.string.leave_yes, new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface d, int w) { finish(); }
                })
                .setNegativeButton(R.string.leave_no, null)
                .show();
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (web != null) web.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (web != null) web.onResume();
    }

    @Override
    protected void onDestroy() {
        if (web != null) { web.destroy(); web = null; }
        super.onDestroy();
    }
}
