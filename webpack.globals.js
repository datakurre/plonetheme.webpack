const path = require('path');
const webpack = require('webpack');

function resolve(base) {
  return base.startsWith('/') ? base
    : path.resolve(path.join(path.dirname(__filename), base));
}

function resolver(base) {
  return function (sub) {
    return resolve(base ? (
      sub ? path.join(resolve(base), sub) : resolve(base)
    ) : (
      sub ? resolve(sub) : __dirname
    ));
  };
}

const SRC = resolver('./src/theme/webpack');
const CMFPLONE = resolver('./lib/Products.CMFPlone/Products/CMFPlone');
const JQUERY_RECURRENCE = resolver('./lib/jquery.recurrenceinput');
const JQUERY_TMPL = resolver('./lib/jquery-tmpl');
const JQUERY_TOOLS = resolver('./lib/jquerytools/src');
const LOGGING = resolver('./lib/logging');
const MOCKUP = resolver('./lib/mockup/mockup');
const PATTERNSLIB = resolver('./lib/patternslib');
const TINYMCE = resolver('./lib/tinymce-builded');
const MOSAIC = resolver('./lib/plone.app.mosaic/src/plone/app/mosaic');

const alias = {
  // Add-ons
  'PloneFormGen': resolve('./lib/Products.PloneFormGen/Products/PloneFormGen/browser/resources'),
  'plonetheme.barceloneta': resolve('./lib/plonetheme.barceloneta/plonetheme/barceloneta/theme'),
  'plonetheme.webpack': SRC(),
  'plone.app.mosaic': MOSAIC(),
  'mosaic-url': MOSAIC('browser/static/js'),

  // Legacy bower aliases
  'bower/bootstrap': 'bootstrap',
  'bowerbootstrap': 'bootstrap',
  'bower/dropzone': 'dropzone',
  'bower/jqtree': 'jqtree',
  'bower/jquery.recurrenceinput.js': JQUERY_RECURRENCE(),
  'bower/pickadate': 'pickadate',
  'bower/select2': 'select2',
  'bower/tinymce-builded': TINYMCE(),

  // Plone core-bundles and mockup aliases
  'ace': 'brace',
  'bootstrap-alert': 'bootstrap/js/alert',
  'bootstrap-collapse': 'bootstrap/js/collapse',
  'bootstrap-dropdown': 'bootstrap/js/dropdown',
  'bootstrap-tooltip': 'bootstrap/js/tooltip',
  'bootstrap-transition': 'bootstrap/js/transition',
  'jquery.event.drag': MOCKUP('lib/jquery.event.drag'),
  'jquery.event.drop': MOCKUP('lib/jquery.event.drop'),
  'jquery.form': 'jquery-form',
  'jquery.recurrenceinput': JQUERY_RECURRENCE('src/jquery.recurrenceinput'),
  'jquery.tmpl': JQUERY_TMPL('jquery.tmpl'),
  'mockup-i18n': MOCKUP('js/i18n'),
  'mockup-less': MOCKUP('less'),
  'mockup': MOCKUP('patterns'),
  'mockup-patterns-autotoc.less': MOCKUP('patterns/autotoc/pattern.autotoc.less'),
  'mockup-patterns-autotoc': MOCKUP('patterns/autotoc/pattern'),
  'mockup-patterns-backdrop': MOCKUP('patterns/backdrop/pattern'),
  'mockup-patterns-base': MOCKUP('patterns/base/pattern'),
  'mockup-patterns-contentloader': MOCKUP('patterns/contentloader/pattern'),
  'mockup-patterns-cookietrigger': MOCKUP('patterns/cookietrigger/pattern'),
  'mockup-patterns-eventedit': MOCKUP('patterns/eventedit/pattern'),
  'mockup-patterns-filemanager': MOCKUP('patterns/filemanager/pattern'),
  'mockup-patterns-filemanager.less': MOCKUP('patterns/filemanager/pattern.filemanager.less'),
  'mockup-patterns-filemanager-url': MOCKUP('patterns/filemanager'),
  'mockup-patterns-formautofocus': MOCKUP('patterns/formautofocus/pattern'),
  'mockup-patterns-formunloadalert': MOCKUP('patterns/formunloadalert/pattern'),
  'mockup-patterns-inlinevalidation': MOCKUP('patterns/inlinevalidation/pattern'),
  'mockup-patterns-livesearch.less': MOCKUP('patterns/livesearch/pattern.livesearch.less'),
  'mockup-patterns-livesearch': MOCKUP('patterns/livesearch/pattern'),
  'mockup-patterns-markspeciallinks.less': MOCKUP('patterns/markspeciallinks/pattern.markspeciallinks.less'),
  'mockup-patterns-markspeciallinks': MOCKUP('patterns/markspeciallinks/pattern'),
  'mockup-patterns-modal.less': MOCKUP('patterns/modal/pattern.modal.less'),
  'mockup-patterns-modal': MOCKUP('patterns/modal/pattern'),
  'mockup-patterns-moment': MOCKUP('patterns/moment/pattern'),
  'mockup-patterns-passwordstrength': MOCKUP('patterns/passwordstrength/pattern'),
  'mockup-patterns-passwordstrength-url': MOCKUP('patterns/passwordstrength'),
  'mockup-patterns-pickadate.less': MOCKUP('patterns/pickadate/pattern.pickadate.less'),
  'mockup-patterns-pickadate': MOCKUP('patterns/pickadate/pattern'),
  'mockup-patterns-preventdoublesubmit': MOCKUP('patterns/preventdoublesubmit/pattern'),
  'mockup-patterns-querystring.less': MOCKUP('patterns/querystring/pattern.querystring.less'),
  'mockup-patterns-querystring': MOCKUP('patterns/querystring/pattern'),
  'mockup-patterns-recurrence.less': MOCKUP('patterns/recurrence/pattern.recurrence.less'),
  'mockup-patterns-recurrence': MOCKUP('patterns/recurrence/pattern'),
  'mockup-patterns-relateditems.less': MOCKUP('patterns/relateditems/pattern.relateditems.less'),
  'mockup-patterns-relateditems': MOCKUP('patterns/relateditems/pattern'),
  'mockup-patterns-resourceregistry': MOCKUP('patterns/resourceregistry/pattern'),
  'mockup-patterns-resourceregistry.less': MOCKUP('patterns/resourceregistry/pattern.resourceregistry.less'),
  'mockup-patterns-resourceregistry-url': MOCKUP('patterns/resourceregistry'),
  'mockup-patterns-select2.less': MOCKUP('patterns/select2/pattern.select2.less'),
  'mockup-patterns-select2': MOCKUP('patterns/select2/pattern'),
  'mockup-patterns-sortable': MOCKUP('patterns/sortable/pattern'),
  'mockup-patterns-structure.less': MOCKUP('patterns/structure/less/pattern.structure.less'),
  'mockup-patterns-structure': MOCKUP('patterns/structure/pattern'),
  'mockup-patterns-structure-url': MOCKUP('patterns/structure'),
  'mockup-patterns-textareamimetypeselector': MOCKUP('patterns/textareamimetypeselector/pattern'),
  'mockup-patterns-texteditor': MOCKUP('patterns/texteditor/pattern'),
  'mockup-patterns-thememapper': MOCKUP('patterns/thememapper/pattern'),
  'mockup-patterns-thememapper.less': MOCKUP('patterns/thememapper/pattern.thememapper.less'),
  'mockup-patterns-thememapper-url': MOCKUP('patterns/thememapper'),
  'mockup-patterns-tinymce.less': MOCKUP('patterns/tinymce/less/pattern.tinymce.less'),
  'mockup-patterns-tinymce': MOCKUP('patterns/tinymce/pattern'),
  'mockup-patterns-tinymce-url': MOCKUP('patterns/tinymce'),
  'mockup-patterns-toggle': MOCKUP('patterns/toggle/pattern'),
  'mockup-patterns-tooltip': MOCKUP('patterns/tooltip/pattern'),
  'mockup-patterns-tree': MOCKUP('patterns/tree/pattern'),
  'mockup-patterns-upload.less': MOCKUP('patterns/upload/less/pattern.upload.less'),
  'mockup-patterns-upload': MOCKUP('patterns/upload/pattern'),
  'mockup-patterns-upload-url': MOCKUP('patterns/upload'),
  'mockup-router': MOCKUP('js/router'),
  'mockup-ui-url': MOCKUP('js/ui'),
  'mockup-utils': MOCKUP('js/utils'),
  'picker.date': 'pickadate/lib/picker.date',
  'picker': 'pickadate/lib/picker',
  'picker.time': 'pickadate/lib/picker.time',
  'plone': CMFPLONE('static'),
  'plone-logged-in': CMFPLONE('static/plone-logged-in'),
  'plone-patterns-portletmanager': resolve('./lib/plone.app.portlets/plone/app/portlets/browser/manage-portlets'),
  'plone-patterns-toolbar': CMFPLONE('static/patterns/toolbar/src/toolbar'),
  'plone-patterns-toolbar.less': SRC('toolbar.less'),
  'plone-toolbar': CMFPLONE('static/patterns/toolbar/src'),
  'translate': MOCKUP('js/i18n-wrapper'),

  // TinyMCE aliases
  'tinymce': TINYMCE('js/tinymce/tinymce'),
  'tinymce-advlist': TINYMCE('js/tinymce/plugins/advlist/plugin'),
  'tinymce-anchor': TINYMCE('js/tinymce/plugins/anchor/plugin'),
  'tinymce-autolink': TINYMCE('js/tinymce/plugins/autolink/plugin'),
  'tinymce-autoresize': TINYMCE('js/tinymce/plugins/autoresize/plugin'),
  'tinymce-autosave': TINYMCE('js/tinymce/plugins/autosave/plugin'),
  'tinymce-bbcode': TINYMCE('js/tinymce/plugins/bbcode/plugin'),
  'tinymce-charmap': TINYMCE('js/tinymce/plugins/charmap/plugin'),
  'tinymce-code': TINYMCE('js/tinymce/plugins/code/plugin'),
  'tinymce-colorpicker': TINYMCE('js/tinymce/plugins/colorpicker/plugin'),
  'tinymce-compat3x': TINYMCE('js/tinymce/plugins/compat3x/plugin'),
  'tinymce-contextmenu': TINYMCE('js/tinymce/plugins/contextmenu/plugin'),
  'tinymce-directionality': TINYMCE('js/tinymce/plugins/directionality/plugin'),
  'tinymce-emoticons': TINYMCE('js/tinymce/plugins/emoticons/plugin'),
  'tinymce-fullpage': TINYMCE('js/tinymce/plugins/fullpage/plugin'),
  'tinymce-fullscreen': TINYMCE('js/tinymce/plugins/fullscreen/plugin'),
  'tinymce-hr': TINYMCE('js/tinymce/plugins/hr/plugin'),
  'tinymce-image': TINYMCE('js/tinymce/plugins/image/plugin'),
  'tinymce-importcss': TINYMCE('js/tinymce/plugins/importcss/plugin'),
  'tinymce-insertdatetime': TINYMCE('js/tinymce/plugins/insertdatetime/plugin'),
  'tinymce-layer': TINYMCE('js/tinymce/plugins/layer/plugin'),
  'tinymce-legacyoutput': TINYMCE('js/tinymce/plugins/legacyoutput/plugin'),
  'tinymce-link': TINYMCE('js/tinymce/plugins/link/plugin'),
  'tinymce-lists': TINYMCE('js/tinymce/plugins/lists/plugin'),
  'tinymce-media': TINYMCE('js/tinymce/plugins/media/plugin'),
  'tinymce-modern-theme': TINYMCE('js/tinymce/themes/modern/theme'),
  'tinymce-nonbreaking': TINYMCE('js/tinymce/plugins/nonbreaking/plugin'),
  'tinymce-noneditable': TINYMCE('js/tinymce/plugins/noneditable/plugin'),
  'tinymce-pagebreak': TINYMCE('js/tinymce/plugins/pagebreak/plugin'),
  'tinymce-paste': TINYMCE('js/tinymce/plugins/paste/plugin'),
  'tinymce-preview': TINYMCE('js/tinymce/plugins/preview/plugin'),
  'tinymce-print': TINYMCE('js/tinymce/plugins/print/plugin'),
  'tinymce-save': TINYMCE('js/tinymce/plugins/save/plugin'),
  'tinymce-searchreplace': TINYMCE('js/tinymce/plugins/searchreplace/plugin'),
  'tinymce-spellchecker': TINYMCE('js/tinymce/plugins/spellchecker/plugin'),
  'tinymce-tabfocus': TINYMCE('js/tinymce/plugins/tabfocus/plugin'),
  'tinymce-table': TINYMCE('js/tinymce/plugins/table/plugin'),
  'tinymce-template': TINYMCE('js/tinymce/plugins/template/plugin'),
  'tinymce-textcolor': TINYMCE('js/tinymce/plugins/textcolor/plugin'),
  'tinymce-textpattern': TINYMCE('js/tinymce/plugins/textpattern/plugin'),
  'tinymce-visualblocks': TINYMCE('js/tinymce/plugins/visualblocks/plugin'),
  'tinymce-visualchars': TINYMCE('js/tinymce/plugins/visualchars/plugin'),
  'tinymce-wordcount': TINYMCE('js/tinymce/plugins/wordcount/plugin'),

  // Patternslib aliases
  'pat-base': PATTERNSLIB('src/core/base'),
  'pat-compat': PATTERNSLIB('/src/core/compat'),
  'pat-jquery-ext': PATTERNSLIB('src/core/jquery-ext'),
  'pat-logger': PATTERNSLIB('/src/core/logger'),
  'pat-mockup-parser': PATTERNSLIB('src/core/mockup-parser'),
  'pat-registry': PATTERNSLIB('src/core/registry'),
  'pat-utils': PATTERNSLIB('src/core/utils'),
  'logging': LOGGING('src/logging'),

  // JQueryTools aliases
  'jquerytools.tabs': JQUERY_TOOLS('tabs/tabs')
};

module.exports = {
  resolve: {

    alias: alias

  },
  module: {
    loaders: [

      { test: /\.(png|gif|otf|eot|svg|ttf|woff|woff2)$/,
        loader: 'url?limit=8192' },

      { test: alias['tinymce'],
        loader: 'exports?tinymce' },

      { test: alias['jquery.recurrenceinput'],
        loader: 'imports?tmpl=jquery.tmpl' },

      { test: alias['jquery.event.drop'],
        loader: 'exports?$.drop' },

      { test: alias['jquerytools.tabs'],
        loader: 'exports?$.tabs' },

      { test: /backbone\.paginator/,
        loader: 'imports?_=underscore' },

      { test: /PloneFormGen.*quickedit\.js$/,
        loader: 'imports?requirejs=>define,_tabs=jquerytools.tabs' }

    ]
  },
  plugins: [

    // Fix generic issue where now and then we expect jQuery to be
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),

    // Fix issues where css-loader left url()s with relative paths
    new webpack.NormalModuleReplacementPlugin(
      new RegExp('^\./[^\.]+\.(png|gif)$'), function(ob) {
        switch(ob.request) {
          case './prev.gif':
          case './next.gif':
          case './pb_close.png':
            ob.request = resolve(
              path.join(JQUERY_RECURRENCE('lib'), ob.request));
            break;
          case './jqtree-circle.png':
            ob.request = 'jqtree/jqtree-circle.png';
            break;
        }
      }
    ),

    // Fix plone.app.mosaic icon paths
    new webpack.NormalModuleReplacementPlugin(
      new RegExp('plone.app.mosaic.images'), function(ob) {
        ob.request = path.join(MOSAIC('browser/static/img'),
          path.basename(ob.request));
      }
    )
  ]
};
