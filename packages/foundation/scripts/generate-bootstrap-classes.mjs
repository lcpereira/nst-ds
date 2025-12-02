#!/usr/bin/env node
// POC: Gera classes CSS completas do Bootstrap 5 usando tokens do Foundation

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const coreTokens = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/tokens/core/tokens.json'), 'utf-8')
);

function generateBootstrapClasses() {
  const sections = [];

  // ============================================
  // RESET & BASE STYLES
  // ============================================
  sections.push(`
*,
*::before,
*::after {
  box-sizing: border-box;
}
html {
  font-family: sans-serif;
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
body {
  margin: 0;
  font-family: var(--nst-font-sans);
  font-size: var(--nst-font-size-base);
  font-weight: var(--nst-font-weight-normal);
  line-height: 1.5;
  color: var(--nst-color-foreground);
  background-color: var(--nst-color-background);
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
h1, h2, h3, h4, h5, h6 {
  margin-top: 0;
  margin-bottom: var(--nst-spacing-2);
  font-weight: var(--nst-font-weight-semibold);
  line-height: 1.2;
}
h1 { font-size: var(--nst-font-size-4xl); }
h2 { font-size: var(--nst-font-size-3xl); }
h3 { font-size: var(--nst-font-size-2xl); }
h4 { font-size: var(--nst-font-size-xl); }
h5 { font-size: var(--nst-font-size-lg); }
h6 { font-size: var(--nst-font-size-base); }
p {
  margin-top: 0;
  margin-bottom: var(--nst-spacing-4);
}
a {
  color: hsl(var(--nst-color-primary));
  text-decoration: none;
  background-color: transparent;
}
a:hover {
  color: hsl(var(--nst-color-primary) / 0.9);
  text-decoration: underline;
}
a:not([href]):not([class]) {
  color: inherit;
  text-decoration: none;
}
a:not([href]):not([class]):hover {
  color: inherit;
  text-decoration: none;
}
strong {
  font-weight: var(--nst-font-weight-bold);
}
small {
  font-size: var(--nst-font-size-sm);
}
ul, ol {
  padding-left: var(--nst-spacing-6);
  margin-top: 0;
  margin-bottom: var(--nst-spacing-4);
}
`);

  // ============================================
  // UTILITIES
  // ============================================
  
  // Spacing
  const spacing = [];
  Object.keys(coreTokens.spacing).forEach(key => {
    const value = coreTokens.spacing[key];
    spacing.push(`.m-${key} { margin: ${value} !important; }`);
    spacing.push(`.mt-${key} { margin-top: ${value} !important; }`);
    spacing.push(`.me-${key} { margin-right: ${value} !important; }`);
    spacing.push(`.mb-${key} { margin-bottom: ${value} !important; }`);
    spacing.push(`.ms-${key} { margin-left: ${value} !important; }`);
    spacing.push(`.mx-${key} { margin-left: ${value} !important; margin-right: ${value} !important; }`);
    spacing.push(`.my-${key} { margin-top: ${value} !important; margin-bottom: ${value} !important; }`);
    spacing.push(`.p-${key} { padding: ${value} !important; }`);
    spacing.push(`.pt-${key} { padding-top: ${value} !important; }`);
    spacing.push(`.pe-${key} { padding-right: ${value} !important; }`);
    spacing.push(`.pb-${key} { padding-bottom: ${value} !important; }`);
    spacing.push(`.ps-${key} { padding-left: ${value} !important; }`);
    spacing.push(`.px-${key} { padding-left: ${value} !important; padding-right: ${value} !important; }`);
    spacing.push(`.py-${key} { padding-top: ${value} !important; padding-bottom: ${value} !important; }`);
  });
  sections.push(spacing.join('\n'));

  // Display
  sections.push(`
.d-none { display: none !important; }
.d-inline { display: inline !important; }
.d-inline-block { display: inline-block !important; }
.d-block { display: block !important; }
.d-flex { display: flex !important; }
.d-inline-flex { display: inline-flex !important; }
.d-grid { display: grid !important; }
.d-table { display: table !important; }
.d-table-row { display: table-row !important; }
.d-table-cell { display: table-cell !important; }
`);

  // Flexbox
  sections.push(`
.flex-row { flex-direction: row !important; }
.flex-column { flex-direction: column !important; }
.flex-row-reverse { flex-direction: row-reverse !important; }
.flex-column-reverse { flex-direction: column-reverse !important; }
.flex-wrap { flex-wrap: wrap !important; }
.flex-nowrap { flex-wrap: nowrap !important; }
.flex-fill { flex: 1 1 auto !important; }
.justify-content-start { justify-content: flex-start !important; }
.justify-content-end { justify-content: flex-end !important; }
.justify-content-center { justify-content: center !important; }
.justify-content-between { justify-content: space-between !important; }
.justify-content-around { justify-content: space-around !important; }
.justify-content-evenly { justify-content: space-evenly !important; }
.align-items-start { align-items: flex-start !important; }
.align-items-end { align-items: flex-end !important; }
.align-items-center { align-items: center !important; }
.align-items-baseline { align-items: baseline !important; }
.align-items-stretch { align-items: stretch !important; }
.align-self-start { align-self: flex-start !important; }
.align-self-end { align-self: flex-end !important; }
.align-self-center { align-self: center !important; }
.align-self-baseline { align-self: baseline !important; }
.align-self-stretch { align-self: stretch !important; }
.gap-0 { gap: 0 !important; }
.gap-1 { gap: ${coreTokens.spacing[1]} !important; }
.gap-2 { gap: ${coreTokens.spacing[2]} !important; }
.gap-3 { gap: ${coreTokens.spacing[3]} !important; }
.gap-4 { gap: ${coreTokens.spacing[4]} !important; }
.gap-5 { gap: ${coreTokens.spacing[5]} !important; }
`);

  // Typography
  const typography = [];
  Object.keys(coreTokens.typography.fontSize).forEach(key => {
    typography.push(`.fs-${key} { font-size: var(--nst-font-size-${key}) !important; }`);
  });
  typography.push(`
.text-start { text-align: left !important; }
.text-center { text-align: center !important; }
.text-end { text-align: right !important; }
.text-uppercase { text-transform: uppercase !important; }
.text-lowercase { text-transform: lowercase !important; }
.text-capitalize { text-transform: capitalize !important; }
.fw-light { font-weight: 300 !important; }
.fw-normal { font-weight: var(--nst-font-weight-normal) !important; }
.fw-medium { font-weight: var(--nst-font-weight-medium) !important; }
.fw-semibold { font-weight: var(--nst-font-weight-semibold) !important; }
.fw-bold { font-weight: var(--nst-font-weight-bold) !important; }
.text-decoration-none { text-decoration: none !important; }
.text-decoration-underline { text-decoration: underline !important; }
`);
  sections.push(typography.join('\n'));

  // Colors
  sections.push(`
.text-primary { color: hsl(var(--nst-color-primary)) !important; }
.text-secondary { color: hsl(var(--nst-color-secondary)) !important; }
.text-success { color: hsl(var(--nst-color-success)) !important; }
.text-danger { color: hsl(var(--nst-color-error)) !important; }
.text-warning { color: hsl(var(--nst-color-warning)) !important; }
.text-info { color: hsl(var(--nst-color-info)) !important; }
.text-light { color: var(--nst-color-background) !important; }
.text-dark { color: var(--nst-color-foreground) !important; }
.text-muted { color: var(--nst-color-muted) !important; }
.text-white { color: #fff !important; }
.bg-primary { background-color: hsl(var(--nst-color-primary)) !important; }
.bg-secondary { background-color: hsl(var(--nst-color-secondary)) !important; }
.bg-success { background-color: hsl(var(--nst-color-success)) !important; }
.bg-danger { background-color: hsl(var(--nst-color-error)) !important; }
.bg-warning { background-color: hsl(var(--nst-color-warning)) !important; }
.bg-info { background-color: hsl(var(--nst-color-info)) !important; }
.bg-light { background-color: var(--nst-color-background) !important; }
.bg-dark { background-color: var(--nst-color-foreground) !important; }
.bg-white { background-color: #fff !important; }
.bg-transparent { background-color: transparent !important; }
`);

  // Border
  sections.push(`
.border { border: 1px solid var(--nst-color-border) !important; }
.border-0 { border: 0 !important; }
.border-top { border-top: 1px solid var(--nst-color-border) !important; }
.border-end { border-right: 1px solid var(--nst-color-border) !important; }
.border-bottom { border-bottom: 1px solid var(--nst-color-border) !important; }
.border-start { border-left: 1px solid var(--nst-color-border) !important; }
.border-primary { border-color: hsl(var(--nst-color-primary)) !important; }
.border-secondary { border-color: hsl(var(--nst-color-secondary)) !important; }
.border-success { border-color: hsl(var(--nst-color-success)) !important; }
.border-danger { border-color: hsl(var(--nst-color-error)) !important; }
.border-warning { border-color: hsl(var(--nst-color-warning)) !important; }
.border-info { border-color: hsl(var(--nst-color-info)) !important; }
.border-light { border-color: var(--nst-color-background) !important; }
.border-dark { border-color: var(--nst-color-foreground) !important; }
.border-white { border-color: #fff !important; }
`);
  
  // Border Radius
  const radii = [];
  Object.entries(coreTokens.radii).forEach(([key, value]) => {
    radii.push(`.rounded-${key} { border-radius: ${value} !important; }`);
  });
  radii.push(`
.rounded { border-radius: var(--nst-radius-md) !important; }
.rounded-0 { border-radius: 0 !important; }
.rounded-circle { border-radius: 50% !important; }
.rounded-pill { border-radius: var(--nst-radius-full) !important; }
`);
  sections.push(radii.join('\n'));

  // Width & Height
  sections.push(`
.w-25 { width: 25% !important; }
.w-50 { width: 50% !important; }
.w-75 { width: 75% !important; }
.w-100 { width: 100% !important; }
.w-auto { width: auto !important; }
.h-25 { height: 25% !important; }
.h-50 { height: 50% !important; }
.h-75 { height: 75% !important; }
.h-100 { height: 100% !important; }
.h-auto { height: auto !important; }
.mw-100 { max-width: 100% !important; }
.mh-100 { max-height: 100% !important; }
`);

  // Position
  sections.push(`
.position-static { position: static !important; }
.position-relative { position: relative !important; }
.position-absolute { position: absolute !important; }
.position-fixed { position: fixed !important; }
.position-sticky { position: sticky !important; }
.top-0 { top: 0 !important; }
.top-50 { top: 50% !important; }
.top-100 { top: 100% !important; }
.end-0 { right: 0 !important; }
.end-50 { right: 50% !important; }
.end-100 { right: 100% !important; }
.bottom-0 { bottom: 0 !important; }
.bottom-50 { bottom: 50% !important; }
.bottom-100 { bottom: 100% !important; }
.start-0 { left: 0 !important; }
.start-50 { left: 50% !important; }
.start-100 { left: 100% !important; }
.translate-middle { transform: translate(-50%, -50%) !important; }
.translate-middle-x { transform: translateX(-50%) !important; }
.translate-middle-y { transform: translateY(-50%) !important; }
`);

  // Shadow
  sections.push(`
.shadow-sm { box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important; }
.shadow { box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important; }
.shadow-lg { box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important; }
.shadow-none { box-shadow: none !important; }
`);

  // Container
  sections.push(`
.container, .container-fluid {
  width: 100%;
  padding-right: var(--nst-spacing-4);
  padding-left: var(--nst-spacing-4);
  margin-right: auto;
  margin-left: auto;
}
@media (min-width: 576px) {
  .container { max-width: 540px; }
}
@media (min-width: 768px) {
  .container { max-width: 720px; }
}
@media (min-width: 992px) {
  .container { max-width: 960px; }
}
@media (min-width: 1200px) {
  .container { max-width: 1140px; }
}
@media (min-width: 1400px) {
  .container { max-width: 1320px; }
}
`);

  // ============================================
  // COMPONENTS
  // ============================================

  // Buttons
  sections.push(`
.btn {
  display: inline-block;
  font-weight: var(--nst-font-weight-medium);
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  padding: var(--nst-spacing-2) var(--nst-spacing-4);
  font-size: var(--nst-font-size-base);
  border-radius: var(--nst-radius-md);
  transition: var(--nst-transition-colors);
  white-space: nowrap;
}
a.btn {
  text-decoration: none;
}
a.btn:hover {
  text-decoration: none;
}
.btn:hover { text-decoration: none; }
.btn:focus { outline: 0; box-shadow: 0 0 0 0.25rem rgba(0, 0, 0, 0.25); }
.btn:disabled, .btn.disabled { opacity: 0.65; cursor: not-allowed; pointer-events: none; }
.btn-primary {
  color: #fff;
  background-color: hsl(var(--nst-color-primary));
  border-color: hsl(var(--nst-color-primary));
}
.btn-primary:hover:not(:disabled):not(.disabled) {
  color: #fff;
  background-color: hsl(var(--nst-color-primary) / 0.9);
  border-color: hsl(var(--nst-color-primary) / 0.9);
}
.btn-secondary {
  color: #fff;
  background-color: hsl(var(--nst-color-secondary));
  border-color: hsl(var(--nst-color-secondary));
}
.btn-secondary:hover:not(:disabled):not(.disabled) {
  color: #fff;
  background-color: hsl(var(--nst-color-secondary) / 0.9);
  border-color: hsl(var(--nst-color-secondary) / 0.9);
}
.btn-success {
  color: #fff;
  background-color: hsl(var(--nst-color-success));
  border-color: hsl(var(--nst-color-success));
}
.btn-success:hover:not(:disabled):not(.disabled) {
  color: #fff;
  background-color: hsl(var(--nst-color-success) / 0.9);
  border-color: hsl(var(--nst-color-success) / 0.9);
}
.btn-danger {
  color: #fff;
  background-color: hsl(var(--nst-color-error));
  border-color: hsl(var(--nst-color-error));
}
.btn-danger:hover:not(:disabled):not(.disabled) {
  color: #fff;
  background-color: hsl(var(--nst-color-error) / 0.9);
  border-color: hsl(var(--nst-color-error) / 0.9);
}
.btn-warning {
  color: #000;
  background-color: hsl(var(--nst-color-warning));
  border-color: hsl(var(--nst-color-warning));
}
.btn-warning:hover:not(:disabled):not(.disabled) {
  color: #000;
  background-color: hsl(var(--nst-color-warning) / 0.9);
  border-color: hsl(var(--nst-color-warning) / 0.9);
}
.btn-info {
  color: #000;
  background-color: hsl(var(--nst-color-info));
  border-color: hsl(var(--nst-color-info));
}
.btn-info:hover:not(:disabled):not(.disabled) {
  color: #000;
  background-color: hsl(var(--nst-color-info) / 0.9);
  border-color: hsl(var(--nst-color-info) / 0.9);
}
.btn-light {
  color: #000;
  background-color: var(--nst-color-background);
  border-color: var(--nst-color-background);
}
.btn-light:hover:not(:disabled):not(.disabled) {
  color: #000;
  background-color: var(--nst-color-muted);
  border-color: var(--nst-color-muted);
}
.btn-dark {
  color: #fff;
  background-color: var(--nst-color-foreground);
  border-color: var(--nst-color-foreground);
}
.btn-dark:hover:not(:disabled):not(.disabled) {
  color: #fff;
  background-color: var(--nst-color-foreground) / 0.9;
  border-color: var(--nst-color-foreground) / 0.9;
}
.btn-outline-primary {
  color: hsl(var(--nst-color-primary));
  border-color: hsl(var(--nst-color-primary));
  background-color: transparent;
}
.btn-outline-primary:hover:not(:disabled):not(.disabled) {
  color: #fff;
  background-color: hsl(var(--nst-color-primary));
  border-color: hsl(var(--nst-color-primary));
}
.btn-outline-secondary {
  color: hsl(var(--nst-color-secondary));
  border-color: hsl(var(--nst-color-secondary));
  background-color: transparent;
}
.btn-outline-secondary:hover:not(:disabled):not(.disabled) {
  color: #fff;
  background-color: hsl(var(--nst-color-secondary));
  border-color: hsl(var(--nst-color-secondary));
}
.btn-outline-success {
  color: hsl(var(--nst-color-success));
  border-color: hsl(var(--nst-color-success));
  background-color: transparent;
}
.btn-outline-success:hover:not(:disabled):not(.disabled) {
  color: #fff;
  background-color: hsl(var(--nst-color-success));
  border-color: hsl(var(--nst-color-success));
}
.btn-outline-danger {
  color: hsl(var(--nst-color-error));
  border-color: hsl(var(--nst-color-error));
  background-color: transparent;
}
.btn-outline-danger:hover:not(:disabled):not(.disabled) {
  color: #fff;
  background-color: hsl(var(--nst-color-error));
  border-color: hsl(var(--nst-color-error));
}
.btn-outline-warning {
  color: hsl(var(--nst-color-warning));
  border-color: hsl(var(--nst-color-warning));
  background-color: transparent;
}
.btn-outline-warning:hover:not(:disabled):not(.disabled) {
  color: #000;
  background-color: hsl(var(--nst-color-warning));
  border-color: hsl(var(--nst-color-warning));
}
.btn-outline-info {
  color: hsl(var(--nst-color-info));
  border-color: hsl(var(--nst-color-info));
  background-color: transparent;
}
.btn-outline-info:hover:not(:disabled):not(.disabled) {
  color: #000;
  background-color: hsl(var(--nst-color-info));
  border-color: hsl(var(--nst-color-info));
}
.btn-link {
  font-weight: 400;
  color: hsl(var(--nst-color-primary));
  text-decoration: underline;
  background-color: transparent;
  border: 0;
}
.btn-link:hover { color: hsl(var(--nst-color-primary) / 0.9); }
.btn-sm {
  padding: var(--nst-spacing-1) var(--nst-spacing-3);
  font-size: var(--nst-font-size-sm);
  border-radius: var(--nst-radius-sm);
}
.btn-lg {
  padding: var(--nst-spacing-3) var(--nst-spacing-6);
  font-size: var(--nst-font-size-lg);
  border-radius: var(--nst-radius-lg);
}
`);

  // Nav
  sections.push(`
.nav {
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}
.nav-link {
  display: block;
  padding: var(--nst-spacing-2) var(--nst-spacing-4);
  color: var(--nst-color-foreground);
  text-decoration: none;
  transition: var(--nst-transition-colors);
  background-color: transparent;
  border: 0;
}
.nav-link:hover, .nav-link:focus {
  color: hsl(var(--nst-color-primary));
  text-decoration: none;
}
.nav-link.active {
  color: hsl(var(--nst-color-primary));
  font-weight: var(--nst-font-weight-medium);
}
.nav-link.disabled {
  color: var(--nst-color-muted);
  pointer-events: none;
  cursor: default;
}
.nav-tabs {
  border-bottom: 1px solid var(--nst-color-border);
}
.nav-tabs .nav-link {
  margin-bottom: -1px;
  background: none;
  border: 1px solid transparent;
  border-top-left-radius: var(--nst-radius-md);
  border-top-right-radius: var(--nst-radius-md);
}
.nav-tabs .nav-link:hover, .nav-tabs .nav-link:focus {
  border-color: var(--nst-color-border) var(--nst-color-border) var(--nst-color-border);
  isolation: isolate;
}
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  color: var(--nst-color-foreground);
  background-color: var(--nst-color-background);
  border-color: var(--nst-color-border) var(--nst-color-border) var(--nst-color-background);
}
.nav-pills .nav-link {
  background: none;
  border: 0;
  border-radius: var(--nst-radius-md);
}
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #fff;
  background-color: hsl(var(--nst-color-primary));
}
.nav-fill .nav-item,
.nav-fill > .nav-link {
  flex: 1 1 auto;
  text-align: center;
}
.nav-justified .nav-item,
.nav-justified > .nav-link {
  flex-basis: 0;
  flex-grow: 1;
  text-align: center;
}
`);

  // Navbar
  sections.push(`
.navbar {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: var(--nst-spacing-2) var(--nst-spacing-4);
}
.navbar-brand {
  padding-top: var(--nst-spacing-1);
  padding-bottom: var(--nst-spacing-1);
  margin-right: var(--nst-spacing-4);
  font-size: var(--nst-font-size-lg);
  font-weight: var(--nst-font-weight-semibold);
  text-decoration: none;
  white-space: nowrap;
  color: var(--nst-color-foreground);
}
.navbar-brand:hover {
  text-decoration: none;
  color: var(--nst-color-foreground);
}
.navbar-nav {
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}
.navbar-nav .nav-link {
  padding-right: 0;
  padding-left: 0;
}
.navbar-nav .dropdown-menu {
  position: static;
}
.navbar-text {
  padding-top: var(--nst-spacing-2);
  padding-bottom: var(--nst-spacing-2);
  color: var(--nst-color-foreground);
}
.navbar-text a {
  color: hsl(var(--nst-color-primary));
}
.navbar-text a:hover {
  color: hsl(var(--nst-color-primary) / 0.9);
}
.navbar-collapse {
  flex-basis: 100%;
  flex-grow: 1;
  align-items: center;
}
.navbar-collapse:not(.show) {
  display: none;
}
.navbar-collapse.show {
  display: flex !important;
}
@media (max-width: 575.98px) {
  .navbar-expand-sm > .container,
  .navbar-expand-sm > .container-fluid {
    padding-right: 0;
    padding-left: 0;
  }
  .navbar-expand-sm .navbar-collapse:not(.show) {
    display: none;
  }
}
.navbar-toggler {
  padding: var(--nst-spacing-1) var(--nst-spacing-2);
  font-size: var(--nst-font-size-lg);
  line-height: 1;
  background-color: transparent;
  border: 1px solid var(--nst-color-border);
  border-radius: var(--nst-radius-md);
  transition: var(--nst-transition-colors);
  cursor: pointer;
}
.navbar-toggler:hover {
  text-decoration: none;
}
.navbar-toggler:focus {
  text-decoration: none;
  outline: 0;
  box-shadow: 0 0 0 0.25rem;
}
.navbar-toggler-icon {
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%2833, 37, 41, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}
.navbar-light {
  color: var(--nst-color-foreground);
  background-color: var(--nst-color-background);
}
.navbar-light .navbar-brand {
  color: var(--nst-color-foreground);
}
.navbar-light .navbar-nav .nav-link {
  color: var(--nst-color-foreground);
}
.navbar-light .navbar-nav .nav-link:hover,
.navbar-light .navbar-nav .nav-link:focus {
  color: hsl(var(--nst-color-primary));
}
.navbar-light .navbar-nav .nav-link.active {
  color: hsl(var(--nst-color-primary));
}
.navbar-light .navbar-toggler {
  color: var(--nst-color-foreground);
  border-color: var(--nst-color-border);
}
.navbar-light .navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%2833, 37, 41, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}
.navbar-dark {
  color: #fff;
  background-color: var(--nst-color-foreground);
}
.navbar-dark .navbar-brand {
  color: #fff;
}
.navbar-dark .navbar-nav .nav-link {
  color: rgba(255, 255, 255, 0.85);
}
.navbar-dark .navbar-nav .nav-link:hover,
.navbar-dark .navbar-nav .nav-link:focus {
  color: #fff;
}
.navbar-dark .navbar-nav .nav-link.active {
  color: #fff;
}
.navbar-dark .navbar-toggler {
  color: rgba(255, 255, 255, 0.85);
  border-color: rgba(255, 255, 255, 0.1);
}
.navbar-dark .navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.85%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}
.navbar-expand-sm {
  flex-wrap: nowrap;
  justify-content: flex-start;
}
.navbar-expand-sm .navbar-nav {
  flex-direction: row;
}
.navbar-expand-sm .navbar-nav .dropdown-menu {
  position: absolute;
}
.navbar-expand-sm .navbar-nav .nav-link {
  padding-right: var(--nst-spacing-4);
  padding-left: var(--nst-spacing-4);
}
.navbar-expand-sm .navbar-collapse {
  display: flex !important;
  flex-basis: auto;
}
.navbar-expand-sm .navbar-toggler {
  display: none;
}
@media (max-width: 575.98px) {
  .navbar-expand-sm > .container,
  .navbar-expand-sm > .container-fluid {
    padding-right: 0;
    padding-left: 0;
  }
}
@media (min-width: 576px) {
  .navbar-expand-sm .navbar-collapse {
    display: flex !important;
    flex-basis: auto;
  }
  .navbar-expand-sm .navbar-toggler {
    display: none;
  }
}
`);

  // Card
  sections.push(`
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: var(--nst-color-background);
  background-clip: border-box;
  border: 1px solid var(--nst-color-border);
  border-radius: var(--nst-radius-lg);
}
.card > hr {
  margin-right: 0;
  margin-left: 0;
}
.card > .list-group {
  border-top: inherit;
  border-bottom: inherit;
}
.card > .list-group:first-child {
  border-top-width: 0;
  border-top-left-radius: calc(var(--nst-radius-lg) - 1px);
  border-top-right-radius: calc(var(--nst-radius-lg) - 1px);
}
.card > .list-group:last-child {
  border-bottom-width: 0;
  border-bottom-right-radius: calc(var(--nst-radius-lg) - 1px);
  border-bottom-left-radius: calc(var(--nst-radius-lg) - 1px);
}
.card-body {
  flex: 1 1 auto;
  padding: var(--nst-spacing-4);
}
.card-title {
  margin-bottom: var(--nst-spacing-2);
}
.card-subtitle {
  margin-top: calc(var(--nst-spacing-2) * -0.5);
  margin-bottom: 0;
}
.card-text:last-child {
  margin-bottom: 0;
}
.card-link:hover {
  text-decoration: none;
}
.card-link + .card-link {
  margin-left: var(--nst-spacing-4);
}
.card-header {
  padding: var(--nst-spacing-3) var(--nst-spacing-4);
  margin-bottom: 0;
  background-color: var(--nst-color-muted);
  border-bottom: 1px solid var(--nst-color-border);
}
.card-header:first-child {
  border-radius: calc(var(--nst-radius-lg) - 1px) calc(var(--nst-radius-lg) - 1px) 0 0;
}
.card-footer {
  padding: var(--nst-spacing-3) var(--nst-spacing-4);
  background-color: var(--nst-color-muted);
  border-top: 1px solid var(--nst-color-border);
}
.card-footer:last-child {
  border-radius: 0 0 calc(var(--nst-radius-lg) - 1px) calc(var(--nst-radius-lg) - 1px);
}
`);

  // Alert
  sections.push(`
.alert {
  position: relative;
  padding: var(--nst-spacing-3) var(--nst-spacing-4);
  margin-bottom: var(--nst-spacing-4);
  border: 1px solid transparent;
  border-radius: var(--nst-radius-md);
}
.alert-heading {
  color: inherit;
}
.alert-link {
  font-weight: var(--nst-font-weight-bold);
}
.alert-primary {
  color: #084298;
  background-color: hsl(var(--nst-color-primary) / 0.1);
  border-color: hsl(var(--nst-color-primary) / 0.2);
}
.alert-primary .alert-link {
  color: #06357a;
}
.alert-secondary {
  color: #41464b;
  background-color: hsl(var(--nst-color-secondary) / 0.1);
  border-color: hsl(var(--nst-color-secondary) / 0.2);
}
.alert-secondary .alert-link {
  color: #34383c;
}
.alert-success {
  color: #0f5132;
  background-color: hsl(var(--nst-color-success) / 0.1);
  border-color: hsl(var(--nst-color-success) / 0.2);
}
.alert-success .alert-link {
  color: #0c4128;
}
.alert-danger {
  color: #842029;
  background-color: hsl(var(--nst-color-error) / 0.1);
  border-color: hsl(var(--nst-color-error) / 0.2);
}
.alert-danger .alert-link {
  color: #6a1a21;
}
.alert-warning {
  color: #664d03;
  background-color: hsl(var(--nst-color-warning) / 0.1);
  border-color: hsl(var(--nst-color-warning) / 0.2);
}
.alert-warning .alert-link {
  color: #523e02;
}
.alert-info {
  color: #055160;
  background-color: hsl(var(--nst-color-info) / 0.1);
  border-color: hsl(var(--nst-color-info) / 0.2);
}
.alert-info .alert-link {
  color: #04414d;
}
.alert-light {
  color: #636464;
  background-color: var(--nst-color-background);
  border-color: var(--nst-color-border);
}
.alert-light .alert-link {
  color: #4f5050;
}
.alert-dark {
  color: #141619;
  background-color: var(--nst-color-foreground);
  border-color: var(--nst-color-foreground);
}
.alert-dark .alert-link {
  color: #101214;
}
`);

  // Badge
  sections.push(`
.badge {
  display: inline-block;
  padding: var(--nst-spacing-1) var(--nst-spacing-2);
  font-size: var(--nst-font-size-xs);
  font-weight: var(--nst-font-weight-medium);
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: var(--nst-radius-full);
}
.badge:empty {
  display: none;
}
.bg-primary { background-color: hsl(var(--nst-color-primary)) !important; }
.bg-secondary { background-color: hsl(var(--nst-color-secondary)) !important; }
.bg-success { background-color: hsl(var(--nst-color-success)) !important; }
.bg-danger { background-color: hsl(var(--nst-color-error)) !important; }
.bg-warning { background-color: hsl(var(--nst-color-warning)) !important; }
.bg-info { background-color: hsl(var(--nst-color-info)) !important; }
.bg-light { background-color: var(--nst-color-background) !important; color: var(--nst-color-foreground) !important; }
.bg-dark { background-color: var(--nst-color-foreground) !important; }
.rounded-pill { border-radius: var(--nst-radius-full) !important; }
`);

  // List Group
  sections.push(`
.list-group {
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  border-radius: var(--nst-radius-md);
}
.list-group-item-action {
  width: 100%;
  color: var(--nst-color-foreground);
  text-align: inherit;
}
.list-group-item-action:hover, .list-group-item-action:focus {
  z-index: 1;
  color: var(--nst-color-foreground);
  text-decoration: none;
  background-color: var(--nst-color-muted);
}
.list-group-item-action:active {
  color: var(--nst-color-foreground);
  background-color: var(--nst-color-muted);
}
.list-group-item {
  position: relative;
  display: block;
  padding: var(--nst-spacing-3) var(--nst-spacing-4);
  color: var(--nst-color-foreground);
  text-decoration: none;
  background-color: var(--nst-color-background);
  border: 1px solid var(--nst-color-border);
}
.list-group-item:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
.list-group-item:last-child {
  border-bottom-right-radius: inherit;
  border-bottom-left-radius: inherit;
}
.list-group-item.disabled, .list-group-item:disabled {
  color: var(--nst-color-muted);
  pointer-events: none;
  background-color: var(--nst-color-background);
}
.list-group-item.active {
  z-index: 2;
  color: #fff;
  background-color: hsl(var(--nst-color-primary));
  border-color: hsl(var(--nst-color-primary));
}
.list-group-item + .list-group-item {
  border-top-width: 0;
}
.list-group-item + .list-group-item.active {
  margin-top: -1px;
  border-top-width: 1px;
}
`);

  // Breadcrumb
  sections.push(`
.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  padding: 0 0;
  margin-bottom: var(--nst-spacing-4);
  list-style: none;
}
.breadcrumb-item + .breadcrumb-item {
  padding-left: var(--nst-spacing-2);
}
.breadcrumb-item + .breadcrumb-item::before {
  float: left;
  padding-right: var(--nst-spacing-2);
  color: var(--nst-color-muted);
  content: var(--bs-breadcrumb-divider, "/");
}
.breadcrumb-item.active {
  color: var(--nst-color-muted);
}
`);

  // Pagination
  sections.push(`
.pagination {
  display: flex;
  padding-left: 0;
  list-style: none;
}
.page-link {
  position: relative;
  display: block;
  color: hsl(var(--nst-color-primary));
  text-decoration: none;
  background-color: var(--nst-color-background);
  border: 1px solid var(--nst-color-border);
  transition: var(--nst-transition-colors);
}
.page-link:hover {
  z-index: 2;
  color: hsl(var(--nst-color-primary) / 0.9);
  background-color: var(--nst-color-muted);
  border-color: var(--nst-color-border);
}
.page-link:focus {
  z-index: 3;
  color: hsl(var(--nst-color-primary) / 0.9);
  background-color: var(--nst-color-muted);
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(0, 0, 0, 0.25);
}
.page-item:not(:first-child) .page-link {
  margin-left: -1px;
}
.page-item.active .page-link {
  z-index: 3;
  color: #fff;
  background-color: hsl(var(--nst-color-primary));
  border-color: hsl(var(--nst-color-primary));
}
.page-item.disabled .page-link {
  color: var(--nst-color-muted);
  pointer-events: none;
  background-color: var(--nst-color-background);
  border-color: var(--nst-color-border);
}
.pagination-lg .page-link {
  padding: var(--nst-spacing-3) var(--nst-spacing-6);
  font-size: var(--nst-font-size-lg);
}
.pagination-sm .page-link {
  padding: var(--nst-spacing-1) var(--nst-spacing-2);
  font-size: var(--nst-font-size-sm);
}
`);

  // Progress
  sections.push(`
.progress {
  display: flex;
  height: var(--nst-spacing-4);
  overflow: hidden;
  background-color: var(--nst-color-muted);
  border-radius: var(--nst-radius-md);
}
.progress-bar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  background-color: hsl(var(--nst-color-primary));
  transition: width 0.6s ease;
}
.progress-bar-striped {
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-size: var(--nst-spacing-4) var(--nst-spacing-4);
}
.progress-bar-animated {
  animation: progress-bar-stripes 1s linear infinite;
}
@keyframes progress-bar-stripes {
  0% { background-position: var(--nst-spacing-4) 0; }
  100% { background-position: 0 0; }
}
`);

  // Spinner
  sections.push(`
.spinner-border {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  vertical-align: text-bottom;
  border: 0.25em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spinner-border 0.75s linear infinite;
}
.spinner-border-sm {
  width: 1rem;
  height: 1rem;
  border-width: 0.2em;
}
.spinner-grow {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  vertical-align: text-bottom;
  background-color: currentColor;
  border-radius: 50%;
  opacity: 0;
  animation: spinner-grow 0.75s linear infinite;
}
.spinner-grow-sm {
  width: 1rem;
  height: 1rem;
}
@keyframes spinner-border {
  to { transform: rotate(360deg); }
}
@keyframes spinner-grow {
  0% { transform: scale(0); }
  50% { opacity: 1; }
}
`);

  return sections.join('\n\n');
}

// Adicionar classes ao final de cada arquivo CSS de tema
const distCssDir = path.join(__dirname, '../dist/css');
const cssFiles = fs.readdirSync(distCssDir).filter(f => f.endsWith('.css'));

const bootstrapClasses = generateBootstrapClasses();
const classesComment = '\n/* POC: Bootstrap 5 inspired utility classes and components */\n';

cssFiles.forEach(file => {
  const filePath = path.join(distCssDir, file);
  const currentContent = fs.readFileSync(filePath, 'utf-8');
  // Remove classes anteriores se existirem (para rebuild)
  const contentWithoutClasses = currentContent.split('/* POC: Bootstrap')[0];
  fs.writeFileSync(filePath, contentWithoutClasses + classesComment + bootstrapClasses, 'utf-8');
});

console.log('✅ Classes Bootstrap 5 completas adicionadas aos arquivos CSS');
