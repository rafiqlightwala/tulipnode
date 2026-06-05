{
  "targets": [
    {
      "target_name": "<(module_name)",
      "product_dir": "<(module_path)",
      "sources": ["tulind.cpp", "external/tiamalgamation.c"],
      "include_dirs": [ "<!(node -e \"require('nan')\")" ],
      "cflags_cc": ["-std=gnu++20"],
      "xcode_settings": {
        "CLANG_CXX_LANGUAGE_STANDARD": "gnu++20"
      }
    }
  ]
}
