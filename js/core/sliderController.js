// rop-map/js/core/sliderController.js
window.SliderController = (function () {
    const slider = document.getElementById('slider');

    const defaultSeason = SeasonController.getCurrentSeason();
    const episodeCount = defaultSeason.episodes;

    function createSlider(count) {
        if (slider.noUiSlider) {
            slider.noUiSlider.destroy();
        }

        noUiSlider.create(slider, {
            start: [0, count],
            connect: true,
            step: 1,
            range: { min: 0, max: count },
            pips: {
                mode: 'steps',
                density: 100,
                filter: () => 2,
                format: {
                    to: value => (value === 0 ? 'Prologue' : `Episode ${value}`),
                    from: value => Number(value)
                }
            }
        });

        slider.noUiSlider.on('update', function (values) {
            window.timelineChange([Number(values[0]), Number(values[1])]);
        });

        window.timelineChange([0, count]);
    }

    // Initialize with default season
    createSlider(episodeCount);

    // Update slider for a new season
    function updateSlider(newCount) {
        createSlider(newCount);
    }

    return { updateSlider };
})();