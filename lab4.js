document.addEventListener("DOMContentLoaded", () => {
    
    //випадаюче меню
    const dropdownBtn = document.getElementById("dropdownBtn");
    const dropdownMenu = document.getElementById("dropdownMenu");

    if (dropdownBtn && dropdownMenu) {
        //перемикаємо клас .show при кліку на кнопку
        dropdownBtn.addEventListener("click", (e) => {
            e.preventDefault();
            dropdownMenu.classList.toggle("show");
        });

        // закриваєм відно, якщо клік не там
        window.addEventListener("click", (e) => {
            if (!e.target.matches('#dropdownBtn')) {
                if (dropdownMenu.classList.contains('show')) {
                    dropdownMenu.classList.remove('show');
                }
            }
        });
    }

    //карусель
    const slides = document.querySelectorAll(".carousel-slide");
    
    if (slides.length > 0) {
        let slideIndex = 0;

        //перемикаєм слайди
        const showSlides = () => {
            slides.forEach(slide => slide.classList.remove("active"));
            
            slideIndex++;
            if (slideIndex > slides.length) { slideIndex = 1 }
            slides[slideIndex - 1].classList.add("active");
            setTimeout(showSlides, 3000); 
        };

        showSlides();
    }

    //пошук
    const searchInput = document.getElementById("searchInput");
    const directionItems = document.querySelectorAll(".direction-list-item");

    if (searchInput && directionItems.length > 0) {
        searchInput.addEventListener("input", function() {
            const filterText = this.value.toLowerCase();

            directionItems.forEach(item => {
                //пошук h3 всередині блоку
                const title = item.querySelector("h3");
                if (title) {
                    const txtValue = title.textContent || title.innerText;
                    
                    //текст співпадає
                    if (txtValue.toLowerCase().includes(filterText)) {
                        item.classList.remove("hidden-item");
                    } else {
                        //текст не співпадає
                        item.classList.add("hidden-item");
                    }
                }
            });
        });
    }

    //TOOLTIP
    const detailsField = document.getElementById("detailsField");
    const tooltip = document.getElementById("detailsTooltip");

    if (detailsField && tooltip) {
        //наведення миші
        detailsField.addEventListener("mouseover", () => {
            detailsField.classList.add("textarea-highlight");
            tooltip.classList.add("tooltip-visible");
        });

        //курсор пішов
        detailsField.addEventListener("mouseout", () => {
            detailsField.classList.remove("textarea-highlight");
            tooltip.classList.remove("tooltip-visible");
        });
    }
});