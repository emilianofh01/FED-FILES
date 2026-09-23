# Scripts
## [Inv Detail] Script para agregar zoom en inventario
```
<!-- Inventory Detail - Zoom Feature -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/photoswipe@5/dist/photoswipe.css"
/>

<script type="module">
  import PhotoSwipe from 'https://cdn.jsdelivr.net/npm/photoswipe@5/dist/photoswipe.esm.js';
  const images = [];

  jQuery('.single-display-thumbnails img').each((i, e) => {
    jQuery(e).attr('data-index', i);
    images.push({
      src: e.src,
      width: e.naturalWidth,
      height: e.naturalHeight,
    });
  });

  jQuery(document).on('click', '.single-featured-image-main', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const currentIndex =
      parseInt(jQuery('.single-thumbnail-active').attr('data-index')) || 0;

    const pswp = new PhotoSwipe({
      dataSource: images,
      index: currentIndex,
      initialZoomLevel: 'fit',
      secondaryZoomLevel: 2.5,
      maxZoomLevel: 5,
    });
```

## [Inventor Detail] Poner videos abajo de los thumbnails
```
jQuery(document).ready(function () {

            let addedVideos = [];

            jQuery(".single-display-thumbnails img").each(function () {
                let src = jQuery(this).attr("src");

                if (src && src.includes("youtube")) {

                    let match = src.match(/vi\/([^\/]+)\//);
                    let videoId = match ? match[1] : null;

                    if (videoId && !addedVideos.includes(videoId)) {

                        addedVideos.push(videoId);

                        let iframe = '<iframe width="560" height="400" ' +
                            'src="https://www.youtube.com/embed/' + videoId + '" ' +
                            'loading="lazy" ' +
                            'frameborder="0" allowfullscreen></iframe>';

                        jQuery(".inventory-single-blocks-left").first().append(iframe);
                    }

                    jQuery(this).remove();
                }
            });

        });
```

# [Inv List] Eliminar/ocultar Filtros
```
<script>
    jQuery(document).ready(function () {
        if (jQuery('#wpp-inventory-manage-sidebar').length > 0) {
            const titlesToHide = [
                "trim",
                "monthlypayment",
                "category",
                "condition",
                "location",
                "family",
                "enginehours",
                "fueltype"
            ];
            jQuery('#wpp-inventory-manage-sidebar .inventory-search-units-block').each(function () {
                const titleText = jQuery(this).find('.inventory-search-title p').text().toLowerCase().replace(/\s+/g, '');
                if (titlesToHide.includes(titleText)) {
                    jQuery(this).hide();
                }
            });
        }
    });
</script>
```

## Ocultar opciones de SortBy en inventory
```
<script>
  jQuery(document).ready(() => {
    const order = 'first_high';

    const sortOptionsToShow = [
      'availability',
      'price',
      'monthly_payment',
      'model',
    ];

    const $select = jQuery('#sortby-select');

    const options = $select.find('option').toArray();

    // 1. group options safely
    const grouped = {};

    options.forEach((opt) => {
      const value = (opt.value || '').trim();
      const [group, direction] = value.split('|');

      if (!sortOptionsToShow.includes(group)) return;

      if (!grouped[group]) grouped[group] = [];

      grouped[group].push({
        el: opt,
        direction,
      });
    });

    // 2. define global order logic
    const sortFn = (a, b) => {
      if (order === 'first_high') {
        const aIsDesc = a.direction === 'desc';
        const bIsDesc = b.direction === 'desc';

        return bIsDesc - aIsDesc;
      }

      if (order === 'first_low') {
        const aIsAsc = a.direction === 'asc';
        const bIsAsc = b.direction === 'asc';

        return bIsAsc - aIsAsc;
      }

      return 0;
    };

    // 3. build result
    const result = [];

    sortOptionsToShow.forEach((group) => {
      const items = grouped[group];

      if (!items) return;

      const sorted = [...items].sort(sortFn);

      sorted.forEach((i) => result.push(i.el));
    });

    // 4. apply safely
    $select.empty();
    result.forEach((el) => $select.append(el));
  });
</script>
```

## [Inv Detail][Tab Info] Crea un objeto de elementos HTML para poderlos modificar facilmente solo con apuntar a un Key
```
/**** Oculta el dato Industry del tab info ****/
optionsObject['industry'].hide()

<script>
    /* ************************************************************ */
    /* INVENTORY DETAIL (INFO TAB)- DATA FORMATTING & VISIBILITY              */
    /* ************************************************************ */
    const infoContainer = jQuery(
        '.inventory-single-container .inventory-single-blocks-left .single-info'
    );

    // Map the DOM elements into a lookup object for easier manipulation
    // Uses the label name as the key and stores the label/value pair
    let optionsObject = {};
    infoContainer.find('.single-info-desc-name').each(
        (index, element) =>
        (optionsObject[jQuery(element).text().toLowerCase().trim()] = {
            indexElement: jQuery(element),
            valueElement: infoContainer.find('.single-info-values').eq(index),
        })
    );

    // Currency Formatter configuration for US Dollars
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    // MSRP Formatting Logic
    // If 'msrp' exists in the lookup object, clean the string and format as currency
    if (optionsObject['msrp']) {
        const el = optionsObject['msrp'].valueElement;
        // Regex removes any non-numeric characters before parsing
        const val = parseFloat(el.text().replace(/[^0-9.-]+/g, ''));

        if (!isNaN(val)) {
            el.text(formatter.format(val));
        }
    }

    // Bulk Hide Functionality
    // Iterate through keys that should not be visible to the user
    ['industry', 'trim'].forEach((key) => {
        if (optionsObject[key]) {
            optionsObject[key].indexElement.hide();
            optionsObject[key].valueElement.hide();
        }
    });
</script>
```

## [Inv List] Oculta alguna de las opciones de la derecha de cada unidad. Las "right-buttons"
```
<script>
    jQuery(document).ready(() => {
        const optionsToHide = ['Schedule a Test Drive', 'Schedule Test Drive'];

        jQuery(
            '.inventory-single-container .inventory-single-options .cta-button'
        ).each((index, option) =>
            optionsToHide.forEach((optionToHide) =>
                option.text.trim() === optionToHide ? jQuery(option).hide() : ''
            )
        );

        jQuery('.wpp-manage-inventory-container .inventory-right-buttons a').each(
            (index, option) =>
                optionsToHide.forEach((optionToHide) =>
                    option.text.trim() === optionToHide ? jQuery(option).hide() : ''
                )
        );
    });
</script>
```

## [Inv Detail] Modifica los label de los additional charges
```
<script>
jQuery(document).ready(function ($) {

    setTimeout(function () {

        // Replace matching add-on labels without affecting new or undefined add-ons
        const labelMap = {
            'Freight': 'Document Fee',
            'Total': 'Total'
        };

        $('.add-ons-amount-container .label').each(function () {
            const $label = $(this);
            const currentLabel = $.trim($label.text());

            if (Object.prototype.hasOwnProperty.call(labelMap, currentLabel)) {
                $label.text(labelMap[currentLabel]);
            }
        });

    }, 100);

});
</script>
```

## Script para activar el 360
```
<script>
    /* 360 detail code */
    jQuery(document).ready(function () {
        var hasTour360 = jQuery('.inventory-single-container').attr(
            'data-has-tour-360'
        );

        if (hasTour360 === '1') {
            var img = jQuery('<img/>', {
                src: '/wp-content/uploads/2025/03/360-new.png',
                alt: '360 Logo',
                class: 'matterport-3d-logo-detail',
                css: { cursor: 'pointer' },
            });

            img.on('click', function () {
                scrollToIframe();
            });

            jQuery(
                '#main > div.inventory-single-container > div > div.inventory-single-title > h1'
            ).before(img);
        }
    });
    /* end of 360 detail code */



    /* 360 listing code */

    jQuery(document).ready(function () {
        jQuery('.wpp-manage-inventory-container').each(function () {
            var hasTour360 = jQuery(this).attr('data-has-tour-360');

            if (hasTour360 === '1') {
                var url = jQuery(this).find('.inventory-main-title').attr('href');
                var img = jQuery('<img/>', {
                    src: '/wp-content/uploads/2025/03/360-new.png',
                    alt: '360 Logo',
                    class: 'matterport-3d-logo',
                });
                var anchor = jQuery('<a/>', {
                    href: url + '?sci=true',
                    class: 'button360',
                });
                anchor.append(img);
                jQuery(this).find('#print-btn').after(anchor);
            }
        });
    });

    /* end of 360 listing code */
</script>
```
### CSS(Aditional CSS): 
```
.card-view .button360 {
	position: relative;
	bottom: 10px;
}

.list-view .button360 {
	position: relative;
	bottom: 10px;
}

@media only screen and (min-width: 960px) {
	.list-view .button360 {
	position: absolute;
	top: 60px;
	right: 0px;
}
}

.button360 img {
	max-width: 80px;
}
```

## [Inv List] Ocultar Filtros de'l inventario
```
var $filterContainer = jQuery("#inventory-units-main-container");
        var filtersToHide = [
            "price",
            "location",
            "condition"
        ];

        $filterContainer.find(".inventory-search-units-block").each(function () {
            var filterTitle = jQuery(this).find(".inventory-search-title p").text().toLowerCase().trim();
            if (filtersToHide.includes(filterTitle)) {
                jQuery(this).hide();
            }
        });
```

## Insertar Pop up en homepage
## Aparece cada 24hrs (se puede poner siempre)
```
<script>
    jQuery(document).ready(function ($) {
        if ($('body').hasClass('home')) {

            var currentTime = Date.now();
            var storedTime = localStorage.getItem('modalShownTime');
            var twentyFourHours = 24 * 60 * 60 * 1000;
            var shouldShowModal = false;

            if (!storedTime) {
                shouldShowModal = true;
            } else {
                if ((currentTime - parseInt(storedTime)) > twentyFourHours) {
                    shouldShowModal = true;
                }
            }

            if (shouldShowModal) {
                var $modal = $('<div class="pop-up"></div>');
                var $content = $('<div class="content"></div>');
                var $link = $('<a></a>').attr('href', '#');
                var $img = $('<img>').attr('src', '/wp-content/uploads/2026/06/Nomad-Sale-FB-Instagram-new.png');

                var $close = $('<span>&times;</span>').on('click', function () {
                    $modal.removeClass('open');
                    setTimeout(function () {
                        $modal.remove();
                    }, 300);
                });

                $link.append($img);

                $content.append($close);
                $content.append($link);

                $modal.append($content);
                $('body').append($modal);

                setTimeout(function () {
                    $modal.addClass('open');
                    $content.addClass('open');
                }, 10);

                localStorage.setItem('modalShownTime', currentTime.toString());
            }
        }
    });
</script>
```

### CSS
```
/* POPUP OVERLAY */
.pop-up {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all ease-in-out 0.3s;
}

.pop-up.open {
  opacity: 1;
  visibility: visible;
  background-color: rgba(0, 0, 0, 0.6);
}

.pop-up .content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  transform: scale(0.8);
  transition: transform ease-in-out 0.3s;
  width: 90%;
  /* max-width: 300px; */
  max-width: fit-content !important;
  border-radius: 12px;
}

.pop-up .content.open {
  transform: scale(1);
}

.pop-up .content span {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 10%;
  background-color: #f21820;
  color: #fff;
  font-size: 28px;
  position: absolute;
  right: -10px;
  top: -10px;
  z-index: 10;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: background-color ease-in-out 0.2s;
}

.pop-up .content span:hover {
  background-color: #cc0000;
}

.pop-up .content a {
  display: block;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.pop-up .content a img {
  display: block;
  width: 100%;
  height: auto;
  max-height: 85vh;
  -o-object-fit: contain;
  object-fit: contain;
  border-radius: 12px;
}

@media (min-width: 576px) {
  .pop-up .content {
    max-width: 500px;
  }
}
@media (min-width: 768px) {
  .pop-up .content {
    max-width: 650px;
  }
  .pop-up .content span {
    right: -20px;
    top: -15px;
  }
}
@media (min-width: 992px) {
  .pop-up .content {
    max-width: 800px;
  }
}
@media (min-width: 1200px) {
  .pop-up .content {
    max-width: 950px;
  }
  .pop-up .content span {
    /* right: 80px; */
    top: -15px;
  }
}
@media (min-width: 1500px) {
  .pop-up .content {
    max-width: 1100px;
  }
}
@media (min-width: 1800px) {
  .pop-up .content {
    max-width: 1300px;
  }
  .pop-up .content span {
    right: -30px;
    top: -15px;
  }
}
```



## Featured Inventory a Swiper JS
## Por: Victor
```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css">
<script src="https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js" defer=""></script>

<div class="swiper mySwiper">
    <div class="swiper-wrapper custom-featured">
        <div class="swiper-slide skeleton">
            <div>
                <div class="unit-photo"></div>
                <div class="unit-title"></div>
                <div class="unit-description"></div>
                <div class="unit-button"></div>
            </div>
            <div>
                <div class="unit-photo"></div>
                <div class="unit-title"></div>
                <div class="unit-description"></div>
                <div class="unit-button"></div>
            </div>
            <div>
                <div class="unit-photo"></div>
                <div class="unit-title"></div>
                <div class="unit-description"></div>
                <div class="unit-button"></div>
            </div>
        </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
</div>

<div class="featured-hider">
    [featured_inventory show=10]
</div>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        const sourceElements = document.querySelectorAll('#wpp-manage-inventory-featured-slider-content .wpp-manage-inventory-featured-slider-slide');
        const targetContainer = document.querySelector('.custom-featured');

        let newSlidesHTML = '';

        sourceElements.forEach(function (element) {
            const img = element.querySelector('img') ? element.querySelector('img').outerHTML : '';
            const title = element.querySelector('h3') ? element.querySelector('h3').outerHTML : '';

            const phoneEl = element.querySelector('.contact-number');
            const phoneNumber = phoneEl ? `<div class="contact-number">${phoneEl.innerHTML}</div>` : '';

            const priceEl = element.querySelector('.price');
            const unitPrice = priceEl ? `<div class="price">${priceEl.innerHTML}</div>` : '';

            const viewButton = element.querySelector('.view-button') ? element.querySelector('.view-button').outerHTML : '';

            newSlidesHTML += `
                <div class="swiper-slide">
                    ${img}
                    ${title}
                    ${phoneNumber}
                    ${unitPrice}
                    ${viewButton}
                </div>
            `;
        });

        const skeletons = targetContainer.querySelectorAll('.skeleton');
        skeletons.forEach(skel => jQuery(skel).remove());

        if (newSlidesHTML) {
            targetContainer.insertAdjacentHTML('beforeend', newSlidesHTML);
        }

        const swiper = new Swiper(".mySwiper", {
            slidesPerView: 3,
            spaceBetween: 30,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                320: { slidesPerView: 1, spaceBetween: 10 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 }
            }
        });
    });
</script>

<style>
    .featured-hider {
        display: none !important;
    }

    /* Skeleton css styles */
    @keyframes skeleton-shimmer {
        0% {
            background-position-x: 200%;
        }

        100% {
            background-position-x: 0%;
        }
    }

    .custom-featured {
        .swiper-slide.skeleton {
            display: flex;
            align-items: center;
            justify-content: center;

            height: 100px;
            min-height: 400px;

            overflow: hidden;
            margin: 0px 20px !important;

            >div {
                display: flex;
                flex-direction: column;
                justify-content: start;
                align-items: start;

                background-color: white;
                width: 30%;
                height: 100%;

                border-radius: 8px;

                padding: 15px;
                margin: 0px 10px !important;
            }

            .unit-photo,
            .unit-title,
            .unit-description,
            .unit-button {
                --_default-color: #e8e8e8;
                --_shimmer-color: #fff;

                background-color: #e8e8e8;
                width: 100%;
                border-radius: 10px;
                animation: skeleton-shimmer 2s ease-out infinite;

                background: linear-gradient(100deg,
                        var(--_default-color),
                        var(--_default-color) 50%,
                        var(--_shimmer-color) 60%,
                        var(--_default-color) 70%);

                background-size: 200% 100%;
                background-attachment: fixed;
            }

            .unit-photo {
                height: 50%;
                aspect-ratio: 1;
                margin-bottom: 10px;
            }

            .unit-title {
                height: 10%;
                margin-bottom: 10px;
            }

            .unit-description {
                height: 25%;
                margin-bottom: 10px;
            }

            .unit-button {
                width: 30%;
                height: 10%;
            }
        }

        .loader {
            width: 50px;
            padding: 8px;
            aspect-ratio: 1;
            border-radius: 50%;
            background: #25b09b;
            --_m:
                conic-gradient(#0000 10%, #000),
                linear-gradient(#000 0 0) content-box;
            -webkit-mask: var(--_m);
            mask: var(--_m);
            -webkit-mask-composite: source-out;
            mask-composite: subtract;
            animation: l3 1s infinite linear;
        }

        @keyframes l3 {
            to {
                transform: rotate(1turn)
            }
        }
    }
</style>
```

# Homepage
## Pasos para sacar las paginas indexadas del sitios antiguo 
```
var divs = document.querySelectorAll(".MjjYud span > a");
var l = divs.length, i, cur;
var links = [];

// Collect all links into an array
for(i=0; i<l; i++) {
    cur = divs[i];
    links.push(cur.href);
}

// Join them with a new line and use the console's built-in copy function
var result = links.join('\n');
copy(result); 

console.log(l + " links have been copied to your clipboard.");
```

## Plantilla para hacer la lista de paginas indexadas:
* Insertar link de template de la hoja de links *

# Content 
## Script para reviews
Se debe buscar con la consola y en el html la palabra NONCE para copiar la key
```
<script>
    const nonce = '29c7ba35f0'; //Make sure to update this value once you refresh the page with the form

    const reviews = [
        {
            "name": "Dan",
            "comment": "I've purchased 5 motorcycles from Hillsboro MC (and am about to purchase 2 more!) and have always had great experiences. Knowledgable staff, good prices, smooth transaction and strong after-sale support. Also, they have some great customer perks such as organized rides, MX playdays, etc. - a great outfit!",
            "rating": "5"
        },

        {
            "name": "Jonathan",
            "comment": "Great Service",
            "rating": "5"
        },
    ];

    reviews.forEach((review, i) => {
        jQuery.post('/wp-admin/admin-ajax.php', {
            action: 'review_form',
            nonce: nonce,
            name: review.name,
            _wpp_customer_reviews_email: review.email,
            comment: review.comment,
            _wpp_customer_reviews_rating: review.rating
        }, function (res) {
            console.log(`Response ${i + 1}:`, res);
        });
    });

</script>
```

## Puntos importantes al hacer formularios generales y financing (formatos)
Nota importante: ```acuerdense que aqui se marca el check de Use HTML content type, y en el message body va HTML, para los que no son financing:```
Los que no son financing:
```
<p>From: [your-name] [your-email]</p>
<p>Subject: [your-subject]</p>

<p>Message Body:</p>
[all-fields]

-- 
This e-mail was sent from a contact form on [_site_title] ([_site_url])
```

Lo que son financing 
```
<p>From: [your-name] [your-email]</p>
<p>Subject: [your-subject]</p>

<p>Finance Application Received</p>

-- 
This e-mail was sent from a contact form on [_site_title] ([_site_url])
```

## Cambiar orden de tabs del detail 
```
jQuery(function ($) {

    const order = [
        "dealer-notes",
        "description",
        "info",
        "specifications"
    ];

    const sections = {
        description: {
            button: "#single-api-desc-btn",
            content: ".single-api-desc"
        },

        "dealer-notes": {
            button: "#single-desc-btn",
            content: ".single-desc"
        },

        info: {
            button: "#single-info-btn",
            content: ".single-info"
        },

        specifications: {
            button: "#single-specs-btn",
            content: ".single-specs"
        }
    };

    function reorder() {

        const $container = $(".inventory-single-details");

        if (!$container.length) {
            return;
        }

        const fragments = {};

        // ------------------------------------------
        // Capture each complete section FIRST
        // ------------------------------------------

        Object.keys(sections).forEach(function (name) {

            const section = sections[name];

            const $button = $container.find(section.button).first();
            const $content = $container.find(section.content).first();

            if (!$button.length || !$content.length) {
                return;
            }

            // Get the HR while the original structure is intact
            const $hr = $content.nextAll("hr").first();

            const $fragment = $();

            fragments[name] = {
                button: $button,
                content: $content,
                hr: $hr
            };
        });

        // ------------------------------------------
        // Reinsert in requested order
        // ------------------------------------------

        order.forEach(function (name) {

            const section = fragments[name];

            if (!section) {
                return;
            }

            $container.append(section.button);
            $container.append(section.content);

            if (section.hr.length) {
                $container.append(section.hr);
            }
        });
    }

    // Run after the page has loaded
    setTimeout(reorder, 500);

});
```

## Template para TyC y políticas de privacidad
*Pedir de nuevo al otro lado*

Así se agrega un showroom
Y así se esconden las categorías de ese showroom que no queremos

https://github.com/user-attachments/assets/4f8d9825-68fa-407f-98df-034e980898fe

Esta parte dónde dice "Industry" no la cambies nunca
Sólo nos sirve para revisar qué showrooms tiene disponible el site
<img width="863" height="516" alt="image" src="https://github.com/user-attachments/assets/03df4ce1-3dc3-46cb-a929-490bab92b1a5" />


Pero nunca selecciones otro diferente del que ya tiene
Las pestañas para modificar cada showroom aparecen una vez hayas agregado un showroom a una internal 
<img width="1062" height="805" alt="image" src="https://github.com/user-attachments/assets/7a45af0e-c3e7-40b9-a819-1848e8143ed5" />

## Sengrid Token (solicitar al otro lado)
