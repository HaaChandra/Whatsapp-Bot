const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const KelompokHandler = require('./handler/KelompokHandler');  
const axios = require('axios');
const sharp = require('sharp');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
require('dotenv').config();

const client = new Client({
    authStrategy: new LocalAuth(),
});

const kelompokHandler = new KelompokHandler();
// QR Code
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR Code telah dihasilkan, scan dengan WhatsApp!');
});

// Notify when ready
client.on('ready', () => {
    console.log('Bot siap digunakan!');
});

// Event ketika pesan diterima
client.on('message', async (message) => {
    console.log(`Pesan diterima dari ${message.from}: ${message.body}`);

    const perintah = message.body.toLowerCase();

    // Balas dengan menu
    if (perintah === '/menu') {
        message.reply(
            'List Menu:\n' +
            '/daftar  : bot akan mengirimkan link pendaftaran KKN \n' +
            '/panduan : menu petunjuk atau hal yang diperlukan untuk KKN\n' +
            '/kelompok: daftar kelompok KKN\n' +
            '/cari    : mencari kelompok/anggota\n'+
            // '/tambah  : untuk menambahkan kelompok baru\n'+
            '/pengumpulan: Link pengumpulan laporan'
        );
    }

    if (perintah === '/daftar') {
        const linkDaftar = '.....';
        message.reply(`Berikut Link Pendaftaran: ${linkDaftar}`);
    }

    if (perintah === '/panduan') {
        const linkPanduan = '.....';
        message.reply(`Berikut Link Pendaftaran: ${linkPanduan}`);
    }
    // Daftar Kelompok
    if (perintah === '/kelompok') {
        const daftarKelompok = kelompokHandler.getAllKelompok();
        message.reply(`Daftar Kelompok KKN:\n${daftarKelompok}`);
    }

    // Cari nama Anggota
    if (perintah.startsWith('/cari')) {
        const query = message.body.slice(6).trim(); // Ambil nama setelah '/cari'
        if (!query) {
            message.reply('Harap masukkan nama anggota untuk mencari.\nContoh: /cari Alice');
            return;
        }

        const hasilPencarian = kelompokHandler.findKelompokByAnggota(query);
        message.reply(hasilPencarian);
    }
});

// Notify when bot joins group
client.on('group_join', async (notification) => {
    console.log('Bot telah bergabung ke Grup!');
    await client.sendMessage(notification.id.remote, 'Terima Kasih telah menambahkan LRI-BOT. Ketik "/menu" untuk melihat menu.');
});

// Mulai klien
client.initialize();
