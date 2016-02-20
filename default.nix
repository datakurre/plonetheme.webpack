with import <nixpkgs> {}; with python27Packages;
let dependencies = rec {
  buildout = zc_buildout_nix.overrideDerivation (args: {
    postInstall = "";  # don't rename 'buildout' to 'buildout-nix'
    propagatedNativeBuildInputs = [
      ldap
      lxml
      python_magic
      pillow
    ];
  });
};
in with dependencies; rec {
  python = pythonFull.buildEnv.override {
    extraLibs = [ buildout ];
    ignoreCollisions = true;
  };
  env = stdenv.mkDerivation rec {
    name = "buildout";
    env = buildEnv { name = name; paths = buildInputs; };
    builder = builtins.toFile "builder.sh" ''
      source $stdenv/setup; ln -s $env $out
    '';
    buildInputs = [ buildout ];
    shellHook = ''
      export BUILDOUT_ARGS="versions:setuptools= versions:zc.buildout= \
      versions:Pillow= versions:lxml= versions:python-ldap= \
      config:plone-hotfixes= config:chameleon-cache=/tmp"
    '';
  };
}
