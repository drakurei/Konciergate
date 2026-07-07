<?php
/**
 * Plugin Name: Konciergate Studio
 * Description: Pilote le contenu du site Konciergate depuis wp-admin — textes (6 langues), images, et publication en un clic.
 * Author: Jonathan
 */

if (!defined('ABSPATH')) { exit; }

class Konciergate_Studio {
    const PROJECT   = 'C:/Users/jonat/Desktop/konciergate-site';
    const LANGS     = ['fr', 'en', 'es', 'zh', 'de', 'it'];
    const IMG_DIRS  = ['images', 'images/clubs', 'images/journey'];

    public function __construct() {
        add_action('admin_menu', [$this, 'menu']);
        add_action('admin_post_kgs_save_texts', [$this, 'save_texts']);
        add_action('admin_post_kgs_replace_image', [$this, 'replace_image']);
        add_action('admin_post_kgs_publish', [$this, 'publish']);
    }

    public function menu() {
        add_menu_page(
            'Konciergate Studio', 'Konciergate', 'manage_options',
            'konciergate-studio', [$this, 'render'], 'dashicons-star-filled', 3
        );
    }

    /* ---------- Helpers ---------- */

    private function flatten($data, $prefix = '') {
        $out = [];
        foreach ($data as $k => $v) {
            $path = $prefix === '' ? (string)$k : $prefix . '.' . $k;
            if (is_array($v)) { $out += $this->flatten($v, $path); }
            else { $out[$path] = (string)$v; }
        }
        return $out;
    }

    private function unflatten($flat) {
        $tree = [];
        foreach ($flat as $path => $value) {
            $keys = explode('.', $path);
            $ref  = &$tree;
            foreach ($keys as $i => $key) {
                if ($i === count($keys) - 1) { $ref[$key] = $value; }
                else {
                    if (!isset($ref[$key]) || !is_array($ref[$key])) { $ref[$key] = []; }
                    $ref = &$ref[$key];
                }
            }
            unset($ref);
        }
        return $this->listify($tree);
    }

    /** Convertit les tableaux à clés 0..n-1 en listes JSON. */
    private function listify($node) {
        if (!is_array($node)) { return $node; }
        foreach ($node as $k => $v) { $node[$k] = $this->listify($v); }
        $keys = array_keys($node);
        $isList = $keys === array_map('strval', range(0, count($node) - 1));
        return $isList ? array_values($node) : $node;
    }

    private function lang() {
        $l = isset($_GET['lang']) ? sanitize_key($_GET['lang']) : 'fr';
        return in_array($l, self::LANGS, true) ? $l : 'fr';
    }

    private function messages_path($lang) {
        return self::PROJECT . '/messages/' . $lang . '.json';
    }

    /* ---------- Actions ---------- */

    public function save_texts() {
        if (!current_user_can('manage_options')) { wp_die('Accès refusé.'); }
        check_admin_referer('kgs_texts');
        $lang = isset($_POST['lang']) ? sanitize_key($_POST['lang']) : 'fr';
        if (!in_array($lang, self::LANGS, true)) { wp_die('Langue inconnue.'); }

        $fields = isset($_POST['kg']) && is_array($_POST['kg']) ? wp_unslash($_POST['kg']) : [];
        $flat = [];
        foreach ($fields as $b64 => $value) {
            $path = base64_decode(strtr($b64, '-_', '+/'));
            if ($path === false || $path === '') { continue; }
            $flat[$path] = (string)$value;
        }
        if (!$flat) { wp_die('Aucun champ reçu.'); }

        $json = json_encode(
            $this->unflatten($flat),
            JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );
        file_put_contents($this->messages_path($lang), $json . "\n", LOCK_EX);

        wp_redirect(admin_url('admin.php?page=konciergate-studio&tab=textes&lang=' . $lang . '&saved=1'));
        exit;
    }

    public function replace_image() {
        if (!current_user_can('manage_options')) { wp_die('Accès refusé.'); }
        check_admin_referer('kgs_image');
        $target = isset($_POST['target']) ? wp_unslash($_POST['target']) : '';
        $target = str_replace(['..', '\\'], '', $target); // anti-traversée
        $allowed = false;
        foreach (self::IMG_DIRS as $dir) {
            if (strpos($target, $dir . '/') === 0) { $allowed = true; break; }
        }
        if (!$allowed || empty($_FILES['file']['tmp_name'])) { wp_die('Cible invalide.'); }

        $destExt = strtolower(pathinfo($target, PATHINFO_EXTENSION));
        $srcExt  = strtolower(pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION));
        $jpg = ['jpg', 'jpeg'];
        $ok  = ($destExt === $srcExt) || (in_array($destExt, $jpg) && in_array($srcExt, $jpg));
        if (!$ok) { wp_die("Le fichier doit être du même type (.$destExt)."); }

        $dest = self::PROJECT . '/public/' . $target;
        move_uploaded_file($_FILES['file']['tmp_name'], $dest);

        wp_redirect(admin_url('admin.php?page=konciergate-studio&tab=images&saved=1'));
        exit;
    }

    public function publish() {
        if (!current_user_can('manage_options')) { wp_die('Accès refusé.'); }
        check_admin_referer('kgs_publish');
        $bat = str_replace('/', '\\', self::PROJECT) . '\\mettre-a-jour-local.bat';
        $logDir = self::PROJECT . '/logs';
        if (!is_dir($logDir)) { mkdir($logDir, 0777, true); }
        $log = str_replace('/', '\\', $logDir) . '\\publish.log';
        @file_put_contents($log, "Lancement de la publication...\r\n");
        pclose(popen('start "" /B cmd /C ""' . $bat . '" auto > "' . $log . '" 2>&1"', 'r'));
        wp_redirect(admin_url('admin.php?page=konciergate-studio&tab=publier&launched=1'));
        exit;
    }

    /* ---------- Interface ---------- */

    public function render() {
        $tab  = isset($_GET['tab']) ? sanitize_key($_GET['tab']) : 'textes';
        $lang = $this->lang();
        $base = admin_url('admin.php?page=konciergate-studio');
        ?>
        <style>
            .kgs-wrap{max-width:1100px}
            .kgs-tabs a{text-decoration:none;padding:8px 16px;display:inline-block;border:1px solid #ccc;border-bottom:none;background:#f6f7f7;color:#1d2327;border-radius:6px 6px 0 0;margin-right:4px}
            .kgs-tabs a.active{background:#1d1d1f;color:#fff;border-color:#1d1d1f}
            .kgs-panel{border:1px solid #ccc;background:#fff;padding:20px;border-radius:0 6px 6px 6px}
            .kgs-field{margin-bottom:10px}
            .kgs-field label{display:block;font-size:11px;color:#787c82;margin-bottom:2px;font-family:monospace}
            .kgs-field input[type=text],.kgs-field textarea{width:100%}
            details.kgs-ns{border:1px solid #e0e0e0;border-radius:6px;margin-bottom:10px;padding:0 14px}
            details.kgs-ns summary{cursor:pointer;font-weight:600;padding:10px 0;text-transform:capitalize}
            .kgs-imgs{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:14px}
            .kgs-img{border:1px solid #e0e0e0;border-radius:6px;padding:10px;text-align:center}
            .kgs-img img{max-height:90px;max-width:100%;object-fit:contain;background:#111;border-radius:4px}
            .kgs-img .name{font-family:monospace;font-size:11px;margin:6px 0;word-break:break-all}
            .kgs-publish-btn{background:#1d1d1f!important;border-color:#1d1d1f!important;padding:8px 26px!important;height:auto!important}
        </style>
        <div class="wrap kgs-wrap">
            <h1>Konciergate Studio</h1>
            <p>Modifiez le contenu du site, puis cliquez <strong>Publier</strong> pour mettre le site à jour.</p>
            <?php if (!empty($_GET['saved'])): ?>
                <div class="notice notice-success"><p>✅ Enregistré. N'oubliez pas de <strong>Publier</strong> pour appliquer sur le site.</p></div>
            <?php endif; ?>
            <?php if (!empty($_GET['launched'])): ?>
                <div class="notice notice-success"><p>🚀 Publication lancée — le site se met à jour (~2 minutes). Rechargez ensuite <a href="http://konciergate.local/fr/" target="_blank">konciergate.local</a> avec Ctrl+F5.</p></div>
            <?php endif; ?>
            <div class="kgs-tabs">
                <a href="<?php echo esc_url($base . '&tab=textes&lang=' . $lang); ?>" class="<?php echo $tab === 'textes' ? 'active' : ''; ?>">✏️ Textes</a>
                <a href="<?php echo esc_url($base . '&tab=images'); ?>" class="<?php echo $tab === 'images' ? 'active' : ''; ?>">🖼️ Images</a>
                <a href="<?php echo esc_url($base . '&tab=publier'); ?>" class="<?php echo $tab === 'publier' ? 'active' : ''; ?>">🚀 Publier</a>
            </div>
            <div class="kgs-panel">
                <?php
                if ($tab === 'images') { $this->render_images(); }
                elseif ($tab === 'publier') { $this->render_publish(); }
                else { $this->render_texts($lang, $base); }
                ?>
            </div>
        </div>
        <?php
    }

    private function render_texts($lang, $base) {
        $file = $this->messages_path($lang);
        if (!file_exists($file)) { echo '<p>Fichier introuvable : ' . esc_html($file) . '</p>'; return; }
        $data = json_decode(file_get_contents($file), true);
        if (!is_array($data)) { echo '<p>JSON illisible.</p>'; return; }
        $flat = $this->flatten($data);

        echo '<p><strong>Langue :</strong> ';
        foreach (self::LANGS as $l) {
            $style = $l === $lang ? 'font-weight:700;text-decoration:underline' : '';
            echo '<a style="margin-right:10px;' . $style . '" href="' . esc_url($base . '&tab=textes&lang=' . $l) . '">' . strtoupper($l) . '</a>';
        }
        echo '</p>';

        echo '<form method="post" action="' . esc_url(admin_url('admin-post.php')) . '">';
        echo '<input type="hidden" name="action" value="kgs_save_texts" />';
        echo '<input type="hidden" name="lang" value="' . esc_attr($lang) . '" />';
        wp_nonce_field('kgs_texts');

        $groups = [];
        foreach ($flat as $path => $value) {
            $ns = explode('.', $path)[0];
            $groups[$ns][$path] = $value;
        }
        foreach ($groups as $ns => $fields) {
            echo '<details class="kgs-ns"><summary>' . esc_html($ns) . ' <span style="color:#999;font-weight:400">(' . count($fields) . ' textes)</span></summary>';
            foreach ($fields as $path => $value) {
                $name = 'kg[' . rtrim(strtr(base64_encode($path), '+/', '-_'), '=') . ']';
                echo '<div class="kgs-field"><label>' . esc_html($path) . '</label>';
                if (mb_strlen($value) > 80) {
                    echo '<textarea name="' . esc_attr($name) . '" rows="2">' . esc_textarea($value) . '</textarea>';
                } else {
                    echo '<input type="text" name="' . esc_attr($name) . '" value="' . esc_attr($value) . '" />';
                }
                echo '</div>';
            }
            echo '</details>';
        }
        submit_button('💾 Enregistrer les textes (' . strtoupper($lang) . ')');
        echo '</form>';
    }

    private function render_images() {
        echo '<p>Remplacez une image par une nouvelle <strong>du même format</strong>. La nouvelle image prendra la place de l\'ancienne sur le site après publication.</p>';
        echo '<div class="kgs-imgs">';
        foreach (self::IMG_DIRS as $dir) {
            $abs = self::PROJECT . '/public/' . $dir;
            if (!is_dir($abs)) { continue; }
            foreach (scandir($abs) as $f) {
                if (!preg_match('/\.(jpe?g|png|svg|webp)$/i', $f)) { continue; }
                $rel = $dir . '/' . $f;
                echo '<div class="kgs-img">';
                echo '<img src="' . esc_url(home_url('/' . $rel)) . '" alt="" loading="lazy" />';
                echo '<div class="name">' . esc_html($rel) . '</div>';
                echo '<form method="post" enctype="multipart/form-data" action="' . esc_url(admin_url('admin-post.php')) . '">';
                echo '<input type="hidden" name="action" value="kgs_replace_image" />';
                echo '<input type="hidden" name="target" value="' . esc_attr($rel) . '" />';
                wp_nonce_field('kgs_image');
                echo '<input type="file" name="file" accept="image/*" required style="font-size:11px;max-width:100%" /> ';
                echo '<button class="button button-small" type="submit">Remplacer</button>';
                echo '</form></div>';
            }
        }
        echo '</div>';
        echo '<p style="margin-top:16px;color:#787c82">🎞️ <strong>Vidéos</strong> : le remplacement demande une conversion (poids web + version mobile) — envoyez le fichier à Jonathan.</p>';
    }

    private function render_publish() {
        $log = self::PROJECT . '/logs/publish.log';
        echo '<p>Reconstruit le site avec vos modifications et met à jour <code>konciergate.local</code> (~2 minutes).</p>';
        echo '<form method="post" action="' . esc_url(admin_url('admin-post.php')) . '">';
        echo '<input type="hidden" name="action" value="kgs_publish" />';
        wp_nonce_field('kgs_publish');
        echo '<p><button type="submit" class="button button-primary kgs-publish-btn">🚀 Publier les modifications</button></p>';
        echo '</form>';
        if (file_exists($log)) {
            $tail = implode('', array_slice(file($log), -12));
            echo '<p><strong>Dernière publication</strong> (' . esc_html(date('d/m/Y H:i', filemtime($log))) . ') :</p>';
            echo '<pre style="background:#1d1d1f;color:#ddd;padding:12px;border-radius:6px;max-height:220px;overflow:auto;font-size:11px">' . esc_html($tail) . '</pre>';
        }
        echo '<p style="color:#787c82">Si le bouton ne fonctionne pas : double-cliquez <code>mettre-a-jour-local.bat</code> dans le dossier du projet.</p>';
    }
}

new Konciergate_Studio();
