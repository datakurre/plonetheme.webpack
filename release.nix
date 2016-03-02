{ supportedSystems ? [ "x86_64-linux" ]
, nixpkgs ? builtins.fetchTarball  # until > 15.09, unstable is required
  "https://github.com/NixOS/nixpkgs-channels/archive/nixos-unstable.tar.gz"
}:

let

  pkgs = import nixpkgs {};

  pkgFor = system: import ./default.nix {
    pkgs = import pkgs.path { inherit system; };
  };

in rec {

  python = pkgs.lib.genAttrs supportedSystems (system: pkgs.lib.hydraJob (
    let package = pkgFor system;
    in pkgs.pythonFull.buildEnv.override {
      extraLibs = package.nativeBuildInputs
                  ++ package.propagatedNativeBuildInputs;
      ignoreCollisions = true;
    }
  ));

}
