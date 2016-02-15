.. image:: https://travis-ci.org/datakurre/plonetheme.webpack.png
   :target: http://travis-ci.org/datakurre/plonetheme.webpack

Plone theme template with Webpack built resources
=================================================

WIP Plone theme example for building all Plone CSS and JavaScript resources
with Webpack, completely pybassing Plone 5 resource registries. Also no bower,
grunt or gulp is required.

Building the included Barceloneta based theme (into ``./build``):

.. code:: bash

   $ git clone https://github.com/datakurre/plonetheme.webpack
   $ cd plonetheme.webpack
   $ make

Building a local Plone-site with the theme available:

.. code:: bash

   $ make bin/instance
   $ bin/instance fg

   # Create a Plone site and activate webpack theme

Running Webpack dev server (for hot resource replacement):

.. code:: bash

   $ make watch

Gotchas
-------

* Webpack requires absolute public path for its asynchronously
  loaded resources. This defaults to ``/Plone/++theme++webpack/`` and
  can be customized with an enviroment variable as in
  ``PUBLIC_PATH=/site/++theme++mytheme/ make build``.

* Webpack seems to fetch media resources for LESS-files only after bundling
  them, which required to copy icons for ``jquery.recurrenceinput.js``
  into ``./src`` with the main style files.
