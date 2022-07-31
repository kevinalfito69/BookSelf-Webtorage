
let dataBuku = [];

function searchData(e) {
    e.preventDefault();
    const searchData = document.querySelector("#searchBookTitle");
    (query = searchData.value),
    query ? show(
            dataBuku.filter(function (dataBuku) {
                return dataBuku.title.toLowerCase().includes(query.toLowerCase());
            })
        ): show(dataBuku);
}
function inputData(e) {
    e.preventDefault();
    const judul = document.querySelector("#inputBookTitle"),
    author = document.querySelector("#inputBookAuthor"),
    year = document.querySelector("#inputBookYear"),
    complete = document.querySelector("#inputBookIsComplete"),
    value = { id: +new Date().getTime(), title: judul.value, author: author.value, year: year.value, isComplete: complete.checked };
    dataBuku.push(value), document.dispatchEvent(new Event("ubahDataBuku"));
}
// hapus data
function hapus(data) {
    const angka = Number(data.target.id),
    output = dataBuku.findIndex(function (dataBuku) {
        return dataBuku.id === angka;
    });
    -1 !== output && (dataBuku.splice(output, 1), document.dispatchEvent(new Event("ubahDataBuku")));
}

function complete(data) {
    const angka = Number(data.target.id),
    output = dataBuku.findIndex(function (dataBuku) {
        return dataBuku.id === angka;
    });
    -1 !== output && ((dataBuku[output] = { ...dataBuku[output], isComplete: !0 }), document.dispatchEvent(new Event("ubahDataBuku")));
}
function unComplete(data) {
    const angka = Number(data.target.id),
    output = dataBuku.findIndex(function (dataBuku) {
        return dataBuku.id === angka;
    });
    -1 !== output && ((dataBuku[output] = { ...dataBuku[output], isComplete: !1 }), document.dispatchEvent(new Event("ubahDataBuku")));
}
//   tampil data
  function show(e) {
    const inComplete = document.querySelector("#incompleteBookshelfList"),
      completeSection = document.querySelector("#completeBookshelfList");
    (inComplete.innerHTML = ""), (completeSection.innerHTML = "");
    for (const show of e) {
        const artikel = document.createElement("article");
        artikel.classList.add("book_item");
        const h2 = document.createElement("h2");
        h2.innerText = show.title;
        const p = document.createElement("p");
        p.innerText = "Penulis: " + show.author;
        const tahun = document.createElement("p");
        if (((tahun.innerText = "Tahun: " + show.year), artikel.appendChild(h2), artikel.appendChild(p), artikel.appendChild(tahun), show.isComplete)) {
            const aksi = document.createElement("div");
            aksi.classList.add("action");
            const buttonGreen = document.createElement("button");
            (buttonGreen.id = show.id), (buttonGreen.innerText = "Belum Selesai dibaca"), buttonGreen.classList.add("green"), buttonGreen.addEventListener("click", unComplete);
            const buttonRed = document.createElement("button");
            (buttonRed.id = show.id),(buttonRed.innerText = "Hapus data buku"),buttonRed.classList.add("red"),
                buttonRed.addEventListener("click", hapus),
                aksi.appendChild(buttonGreen),
                aksi.appendChild(buttonRed),
                artikel.appendChild(aksi),
                completeSection.appendChild(artikel);
    } else {
        const aksi2 = document.createElement("div");
        aksi2.classList.add("action");
        const buttonGreen2 = document.createElement("button");
        (buttonGreen2.id = show.id), (buttonGreen2.innerText = "Selesai dibaca"), buttonGreen2.classList.add("green"), buttonGreen2.addEventListener("click", complete);
        const buttonRed2 = document.createElement("button");
        (buttonRed2.id = show.id),(buttonRed2.innerText = "Hapus data buku"), buttonRed2.classList.add("red"), buttonRed2.addEventListener("click", hapus),
            aksi2.appendChild(buttonGreen2),
            aksi2.appendChild(buttonRed2),
            artikel.appendChild(aksi2),
            inComplete.appendChild(artikel);
        }
    }
}
function convert() {
    !(function (dataBuku) {
    localStorage.setItem("books", JSON.stringify(dataBuku));
    })(dataBuku),
    show(dataBuku);
}
window.addEventListener("load", function () {
    (dataBuku = JSON.parse(localStorage.getItem("books")) || []), show(dataBuku);
    const inputBook = document.querySelector("#inputBook"),
    searchBook = document.querySelector("#searchBook");
    inputBook.addEventListener("submit", inputData), searchBook.addEventListener("submit", searchData), document.addEventListener("ubahDataBuku", convert);
});

