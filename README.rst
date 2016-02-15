.. image:: https://travis-ci.org/datakurre/plonetheme.webpack.png
   :target: http://travis-ci.org/datakurre/plonetheme.webpack

Plone theme template with webpack built resources
=================================================

WIP Plone theme example for building all Plone CSS and JavaScript
resources with webpack, completely independently from Plone 5
resource registries. Also no bower, grunt or gulp is required.

Building the included Barceloneta based theme (into ``./build``):

.. code:: bash

   $ git clone https://github.com/datakurre/plonetheme.webpack
   $ cd plonetheme.webpack
   $ make

Building a local Plone-site with the theme available:

.. code:: bash

   $ make bin/instance
   $ bin/instance fg
