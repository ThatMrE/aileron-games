package games.aileron.dice;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.view.KeyEvent;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/** God Does Not Play Dice — thin WebView shell around the live PWA.
 *  The game itself (and its offline support, via service worker) lives at
 *  aileron.games, so every fix shipped to the site reaches this app instantly. */
public class MainActivity extends Activity {
  private static final String HOME = "https://aileron.games/dice.html?source=apk";
  private WebView web;

  @Override protected void onCreate(Bundle state) {
    super.onCreate(state);
    web = new WebView(this);
    web.setBackgroundColor(Color.parseColor("#050812"));
    WebSettings s = web.getSettings();
    s.setJavaScriptEnabled(true);
    s.setDomStorageEnabled(true);
    web.setWebViewClient(new WebViewClient() {
      @Override public boolean shouldOverrideUrlLoading(WebView v, String url) {
        Uri u = Uri.parse(url);
        if (u.getHost() != null && u.getHost().endsWith("aileron.games")) return false;
        startActivity(new Intent(Intent.ACTION_VIEW, u)); // external links open the real browser
        return true;
      }
    });
    setContentView(web);
    if (state == null) web.loadUrl(HOME); else web.restoreState(state);
  }

  @Override protected void onSaveInstanceState(Bundle out) {
    super.onSaveInstanceState(out);
    web.saveState(out);
  }

  @Override public boolean onKeyDown(int code, KeyEvent e) {
    if (code == KeyEvent.KEYCODE_BACK && web.canGoBack()) { web.goBack(); return true; }
    return super.onKeyDown(code, e);
  }
}
