const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  theme: path.join(__dirname, 'theme'),
  lib: path.join(__dirname, 'lib'),
  build: path.join(__dirname, 'build', 'theme', 'webpack')
};

function builder(base) {
  return function (sub) { return sub ? path.join(__dirname, base, sub) :
                                       path.join(__dirname, base); };
}

SRC = builder(path.join('src'));
BARCELONETA = builder(path.join('lib', 'plonetheme.barceloneta', 'plonetheme', 'barceloneta'));
CMFPLONE = builder(path.join('lib', 'Products.CMFPlone', 'Products', 'CMFPlone'));
JQUERY_RECURRENCE = builder(path.join('lib', 'jquery.recurrenceinput'));
JQUERY_TMPL = builder(path.join('lib', 'jquery-tmpl'));
LOGGING = builder(path.join('lib', 'logging'));
MOCKUP = builder(path.join('lib', 'mockup', 'mockup'));
PATTERNSLIB = builder(path.join('lib', 'patternslib'));
PORTLETS = builder(path.join('lib', 'plone.app.portlets', 'plone', 'app', 'portlets'));
TINYMCE = builder(path.join('lib', 'tinymce-builded'));

const alias = {

  /* Bower */
  'bower/bootstrap': 'bootstrap',
  'bowerbootstrap': 'bootstrap',
  'bower/dropzone': 'dropzone',
  'bower/jqtree': 'jqtree',
  'bower/jquery.recurrenceinput.js': JQUERY_RECURRENCE(),
  'bower/pickadate': 'pickadate',
  'bower/select2': 'select2',
  'bower/tinymce-builded': TINYMCE(),

  /* Plone */
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
  'plone-patterns-portletmanager': PORTLETS('browser/manage-portlets'),
  'plone-patterns-toolbar': CMFPLONE('static/patterns/toolbar/src/toolbar'),
  'plone-patterns-toolbar.less': SRC('toolbar.less'),
  'plonetheme.barceloneta': BARCELONETA('theme'),
  'plone-toolbar': CMFPLONE('static/patterns/toolbar/src'),
  'translate': MOCKUP('js/i18n-wrapper'),

  // TinyMCE
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

  // Patternslib
  'pat-base': PATTERNSLIB('src/core/base'),
  'pat-compat': PATTERNSLIB('/src/core/compat'),
  'pat-jquery-ext': PATTERNSLIB('src/core/jquery-ext'),
  'pat-logger': PATTERNSLIB('/src/core/logger'),
  'pat-mockup-parser': PATTERNSLIB('src/core/mockup-parser'),
  'pat-registry': PATTERNSLIB('src/core/registry'),
  'pat-utils': PATTERNSLIB('src/core/utils'),
  'logging': LOGGING('src/logging')
};

const common = {
  entry: {
    'plone': path.join(PATHS.src, 'plone.js'),
    'plone-logged-in': path.join(PATHS.src, 'plone-logged-in.js')
  },
  resolve: {
    alias: alias
  },
  output: {
    path: PATHS.build
  },
  module: {
    loaders: [
      { test: /backbone.paginator/, loader: 'imports?_=underscore' },
      { test: alias['tinymce'], loader: 'exports?tinymce' },
      { test: alias['jquery.recurrenceinput'], loader: 'imports?tmpl=jquery.tmpl' },
      { test: /\.(png|gif|otf|eot|svg|ttf|woff|woff2).*$/, loader: 'url?limit=8192' }
    ]
  }
};

const TARGET = process.env.TARGET || process.env.NODE_ENV;

if(TARGET === 'build' || !TARGET) {
  module.exports = merge(common, {
    output: {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js',
      publicPath: '/Plone/++theme++webpack/'
    },
    module: {
      loaders: [
        { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!less') }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].[chunkhash].css'),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(PATHS.theme, 'plone.html'),
        inject: false
      }),
      new HtmlWebpackPlugin({
        filename: 'plone-logged-in.html',
        template: path.join(PATHS.theme, 'plone-logged-in.html'),
        inject: false
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }),
      new webpack.optimize.CommonsChunkPlugin('init'),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      })
    ]
  });
}

if(TARGET === 'watch') {
  module.exports = merge(common, {
//  devtool: 'eval-source-map',
    devServer: {
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST || 'localhost',
      port: process.env.PORT || '8080'
    },
    module: {
      loaders: [
        { test: /\.less$/, loaders: ['style', 'css', 'less'] }
      ]
    },
    output: {
      filename: 'bundle.js',
      publicPath: ('http://' + (process.env.HOST || 'localhost') + ':' +
      (process.env.PORT || '8080') + '/assets/')
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}
