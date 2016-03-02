{ pkgs ? import (builtins.fetchTarball  # revision for reproducible builds
  "https://github.com/nixos/nixpkgs-channels/archive/d9f5e94bae088234791ae28f0d813a9fad5b8163.tar.gz") {}
, pythonPackages ? pkgs.python27Packages
}:

let self = {
  buildout = pythonPackages.zc_buildout_nix.overrideDerivation (old: {
    propagatedNativeBuildInputs = with pythonPackages; [
      ldap
      lxml
      pillow
    ];
  });
};

in pkgs.stdenv.mkDerivation rec {
  name = "env";
  buildInputs = with self; [ buildout ];
  shellHook = ''
    function buildout {
      buildout-nix $@ \
        versions:lxml= \
        versions:Pillow= \
        versions:python-ldap= \
        versions:setuptools= \
        versions:zc.buildout=
    }
  '';
}
