---
tags:
  - cpp
  - llvm
---
>[!tip] what does llvm stand for?
>- LLVM originally stood for `Low Level Virtual Machine` - however, the project has since expanded, and the name is no longer an acronym but an orphan initialism
>
>the LLVM Project is a collection of modular and reusable compiler and toolchain technologies - it has little to do with traditional virtual machines

#### what does llvm do?
at its core, llvm is a language-independent intermediate representation (IR) that is build upon three key concepts: (1) frontends, (2) optimizer, (3) backends
- frontends (Clang for C/C++/ObjC, others) translate source code to LLVM IR
- optimizer performs language-agnostic optimizations on IR
- backends generate machine code for different architectures (x86, ARM, etc.)

#cpp #llvm 