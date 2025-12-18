// rop-map/js/core/pathsUIController.js
/*
Responsibility:
- DOM Logic, this will decide what character icons will be put onto html
- Build checkboxes + labels
- Filter characters by season
- Reset paths when season changes
*/

window.PathsUIController = (function () {
    const grid = document.getElementById('pathsgrid');

    function rebuild() {
        const season = SeasonController.getCurrentSeason();
        grid.innerHTML = '';

        const characters = [...new Set(
            DATA_PATHS.paths
                .filter(p => p.season === season.id || p.season >= 100)
                .map(p => p.character)
        )];

        characters.forEach(name => {
            const id = `checkbox-${name.replace(/\s+/g, '')}`;

            grid.insertAdjacentHTML('beforeend', `
                <div class="pathsgrid__card">
                    <input type="checkbox"
                           name="${name}"
                           id="${id}"
                           onchange="setPath(this)" />
                    <label class="pathsgrid__label"
                           for="${id}"
                           tabindex="0"
                           onkeydown="interactionLabel(event)">
                        <img src="img/portraits/${name.toLowerCase().replace(/\s+/g,'')}.webp">
                        <p>${name}</p>
                    </label>
                </div>
            `);
        });
    }

    return { rebuild };
})();