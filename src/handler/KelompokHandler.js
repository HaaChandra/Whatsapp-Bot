class KelompokHandler {
    constructor() {
        // Simpan data kelompok secara lokal
        this.kelompok = [
            { id: 1, nama: "Kelompok 1", anggota: ["satu", "dua", "tiga"] },
            { id: 2, nama: "Kelompok 2", anggota: ["...", "...", "..."] },
            { id: 3, nama: "Kelompok 3", anggota: ["...", "...", "..."] },
        ];
    }

    // Dapatkan daftar semua kelompok
    getAllKelompok() {
        return this.kelompok
            .map(k => `${k.nama}: ${k.anggota.join(", ")}`)
            .join("\n");
    }

    // Cari kelompok berdasarkan nama anggota
    findKelompokByAnggota(namaAnggota) {
        const result = this.kelompok.find(k =>
            k.anggota.some(anggota => anggota.toLowerCase() === namaAnggota.toLowerCase())
        );

        if (result) {
            return `Anggota ditemukan di ${result.nama}: ${result.anggota.join(", ")}`;
        } else {
            return `Anggota dengan nama "${namaAnggota}" tidak ditemukan dalam kelompok manapun.`;
        }
    }
}

module.exports = KelompokHandler;
