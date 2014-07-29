** from Hercules - hstructs.h

struct CKDDASD_DEVHDR {                 /* Device header             */    0
     0  BYTE    devid[8];               /* Device identifier         */
     8  FWORD   heads;                  /* #of heads per cylinder
                                           (bytes in reverse order)  */
    12  FWORD   trksize;                /* Track size (reverse order)*/
    16  BYTE    devtype;                /* Last 2 digits of device type
                                           (0x80=3380, 0x90=3390)    */
    17  BYTE    fileseq;                /* CKD image file sequence no.
                                           (0x00=only file, 0x01=first
                                           file of multiple files)   */
    18  HWORD   highcyl;                /* Highest cylinder number on
                                           this file, or zero if this
                                           is the last or only file
                                           (bytes in reverse order)  */
    20  BYTE    resv[492];              /* Reserved                  */
};

struct CKDDASD_TRKHDR {                 /* Track header              */
        BYTE    bin;                    /* Bin number                */
        HWORD   cyl;                    /* Cylinder number           */
        HWORD   head;                   /* Head number               */
};

struct CKDDASD_RECHDR {                 /* Record header             */
        HWORD   cyl;                    /* Cylinder number           */
        HWORD   head;                   /* Head number               */
        BYTE    rec;                    /* Record number             */
        BYTE    klen;                   /* Key length                */
        HWORD   dlen;                   /* Data length               */
};
