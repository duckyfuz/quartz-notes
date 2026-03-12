printing monitor: https://www.comp.nus.edu.sg/~siglabs/pm/

level 1 printers: psts, pstsb, pstsc
b1 printers: psc011, psc008
\*note: if you want to print double sided, add “-dx” suffix to the printer name, for single sided, add “-sx” suffix to the printer name

```
scp filename.pdf [soc_username]@stu.comp.nus.edu.sg:~
ssh [soc_username]@stu.comp.nus.edu.sg
lpr -P psts filename.pdf
lpq -P psts
```