document.addEventListener("DOMContentLoaded", function () {
    const filterToggle = document.getElementById("filter-toggle");
    const filters = document.getElementById("filters");

    filterToggle.addEventListener("click", function () {
        filters.style.display = filters.style.display === "block" ? "none" : "block";
    });
    document.addEventListener("click", function (event) {
        if (!filters.contains(event.target) && event.target !== filterToggle) {
            filters.style.display = "none";
        }
    });
    const checkboxes = document.querySelectorAll(".filter");
    const videos = document.querySelectorAll(".video-card");

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", filterVideos);
    });

    function filterVideos() {
        const selectedCategories = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        videos.forEach(video => {
            const category = video.getAttribute("data-category");

            if (selectedCategories.length === 0 || selectedCategories.includes(category)) {
                video.style.display = "block";
            } else {
                video.style.display = "none";
            }
        });
    }
});
