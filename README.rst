.. image:: https://travis-ci.org/datakurre/plonetheme.webpack.png
   :target: http://travis-ci.org/datakurre/plonetheme.webpack

Plone theme template with Webpack built resources
=================================================

Plone theme template for building all Plone CSS and JavaScript resources
with Webpack, completely bypassing Plone 5 resource registry.

**Pros:**

* Webpack-optimized chunked resources with asynchronous loading.
* Convenient theme development with Webpack's hot module replacement.
* Complete control of all the resources and their versions.
* No RequireJS, no Bower, no Grunt, no RequireJS configurations distributed
  across the ecosystem.

**Cons:**

* Installing a new Plone add-on requires configuring and building add-on's
  resources into theme.


Requirements
------------

* Git, GNU make, NodeJS >= 4 with npm
* Plone-compatible Python 2.7 environment


Getting started
---------------

Cloning the project:

.. code:: bash

   $ git clone https://github.com/datakurre/plonetheme.webpack
   $ cd plonetheme.webpack

Building the included Barceloneta based theme (into ``./build``):

.. code:: bash

   $ make

Building a local Plone-site with the theme available:

.. code:: bash

   $ make bin/instance
   $ bin/instance fg

   # Create a Plone site and activate webpack theme

Running Webpack dev server (for hot resource replacement):

.. code:: bash

   $ make watch

   # Open the Plone site created in the previous step


Known issues
------------

* Webpack requires absolute public path for its asynchronously
  loaded resources. This defaults to ``/Plone/++theme++webpack/`` but
  can be customized with an enviroment variable as in
  ``PUBLIC_PATH=/site/++theme++mytheme/ make build``.

* Webpack seems to fetch media resources for LESS-files only after building
  LESS into CSS, which required to copy icons for ``jquery.recurrenceinput.js``
  into ``./src`` next the LESS style files.
