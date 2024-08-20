const csvPathIND = "/web-resources/about-us/connectivity/csv/highlightIND.csv";
const csvPathENG = "/web-resources/about-us/connectivity/csv/highlightENG.csv";
const assetsPath = "/web-resources/about-us/connectivity/images/obfa/btfob/desktop/";

document.addEventListener("DOMContentLoaded", () => {
    //do while document is ready
    const lang = document.documentElement.lang;

    if (lang == 'id') {
        initDataCsv(csvPathIND);
    } else {
        initDataCsv(csvPathENG);
    }
});

function initDataCsv(path) {
    Papa.parse(path, {
        download: true,
        header: true,
        complete: function (results, file) {
            const highlighData = results.data;
            applyTemplate(highlighData);
            console.log(highlighData);
        }
    });
}

function buildTemplate(data, option) {
    //define the 2 type icon
    const ytEl = "/web-resources/about-us/connectivity/images/obfa/btfob/icon-card-yt.png";
    const fbEl = "/web-resources/about-us/connectivity/images/obfa/btfob/icon-card-fb.png";

    return "<div class='col-lg-6 d-flex " + (option ? option : '') + "'> \
  <div class='content-card'> \
    <a href='"+ data.url + "' id='highlight-" + data.category + "' target='_blank' style='text-decoration: none'> \
      <div class='row h-100'> \
        <div class='col-lg-6 p-lg-0'> \
          <picture> \
            <img src='"+ assetsPath + data.thumbnail_url + "'class='w-100 h-100'> \
          </picture> \
        </div> \
        <div class='col-lg-6 p-lg-0'> \
          <div class='content-desc-wrapper d-flex flex-column'> \
            <div class='content-desc'> \
              <div class='content-title'> "+ data.title + " </div> \
              <div class='content-shortdesc'> "+ data.description + "</div> \
            </div>\
            <div class='content-footer mt-auto'> \
              <div class='content-footer-wrapper'> \
                <img src='"+ (data.type == 'yt' ? ytEl : fbEl) + "'> \
                <div class='content-footer-text'>"+ data.date + "</div> \
              </div > \
            </div > \
          </div > \
        </div > \
      </div > \
    </a > \
  </div > \
</div > ";
}

function applyTemplate(data) {
    // Memilih elemen HTML di mana template akan ditempatkan
    const container = document.getElementById('highlight-content');

    // Iterasi melalui data dan bangun template untuk setiap item
    data.forEach((item) => {
        // Buat template HTML untuk item saat ini
        const html = buildTemplate(item);

        // Sisipkan template HTML ke dalam kontainer
        container.insertAdjacentHTML('beforeend', html);
    });
}
