interface IStatistics {
    name: string,
    skaat_played: number,
    skaat_winned: number,
    skaat_lost: number,
    abnat: number,
    akak: number,
    akalat: number,
    moshtary_sun: number,
    moshtary_hakam: number,
    moshtrayat_nagha: number,
    moshtrayat_khasera: number,
    sra: number,
    baloot: number,
    khamsin: number,
    m2a: number,
    rb3om2a: number,
    kababit_sun_count: number,
    kababit_hakam_count: number
    [key: string]: string | number;
}

export type { IStatistics };
