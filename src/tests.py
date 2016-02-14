# -*- coding: utf-8 -*- #
from plone.app.robotframework.testing import REMOTE_LIBRARY_BUNDLE_FIXTURE
from plone.app.testing import FunctionalTesting
from plone.app.testing import PloneSandboxLayer
from plone import api
from plone.registry.interfaces import IRegistry
from plone.testing import layered
from plone.testing import z2
from Products.CMFPlone.testing import PRODUCTS_CMFPLONE_FIXTURE
from zope.configuration import xmlconfig
import os
import robotsuite
import unittest


class ThemeLayer(PloneSandboxLayer):
    defaultBases = (PRODUCTS_CMFPLONE_FIXTURE,)

    def setUpZope(self, app, configurationContext):
        path = os.path.normpath(os.path.join(
            os.path.dirname(__file__), os.path.pardir, 'build'))
        xmlconfig.string("""\
<configure xmlns="http://namespaces.zope.org/zope"
           xmlns:plone="http://namespaces.plone.org/plone">
  <plone:static directory="%s" />
</configure>
""" % path, context=configurationContext)

    def setUpPloneSite(self, portal):
        api.portal.set_registry_record(
            'plone.app.theming.interfaces.IThemeSettings.currentTheme',
            u'webpack')
        api.portal.set_registry_record(
            'plone.app.theming.interfaces.IThemeSettings.rules',
            u'/++theme++webpack/rules.xml')
        api.portal.set_registry_record(
            'plone.app.theming.interfaces.IThemeSettings.rules',
            u'/++theme++webpack/rules.xml')
        api.portal.set_registry_record(
            'plone.app.theming.interfaces.IThemeSettings.absolutePrefix',
            u'/++theme++webpack')

THEME_FIXTURE = ThemeLayer()

THEME_ROBOT_TESTING = FunctionalTesting(
    bases = (
        THEME_FIXTURE,
        REMOTE_LIBRARY_BUNDLE_FIXTURE,
        z2.ZSERVER_FIXTURE
    ),
    name='Theme:Acceptance'
)


def test_suite():
    suite = unittest.TestSuite()
    suite.addTests([
        layered(
            robotsuite.RobotTestSuite(
                'robot', package='Products.CMFPlone.tests'),
            layer=THEME_ROBOT_TESTING
        )
    ])
    return suite
