<?php
/**
 * Plugin Name: Konciergate — Accueil vers le site
 * Description: Redirige uniquement la page d'accueil WordPress vers le site Konciergate (/fr/). wp-admin, wp-login et toutes les autres URLs WordPress restent intacts.
 */

add_action('template_redirect', function () {
    if (is_front_page() || is_home()) {
        wp_redirect(home_url('/fr/'), 302);
        exit;
    }
});
