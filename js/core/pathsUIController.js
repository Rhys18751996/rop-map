window.PathsUIController = (function () {
    const grid = document.getElementById('pathsgrid');

    function rebuild() {
        const season = SeasonController.getCurrentSeason();
        const series = season.series; // "rop" or "lotr"

        grid.innerHTML = '';

        Object.values(DATA_CHARACTERS)
            .filter(char =>
                char.series === series &&
                char.seasons.includes(season.id)
            )
            .forEach(char => {
                const id = `checkbox-${char.name.replace(/\s+/g, '')}`;
                const disabled = !PathsController.hasPaths(char.name, season.id);

                grid.insertAdjacentHTML('beforeend', `
                    <div class="pathsgrid__card ${disabled ? 'is-disabled' : ''}">
                        <input type="checkbox"
                               name="${char.name}"
                               id="${id}"
                               ${disabled ? 'disabled' : ''}
                               onchange="setPath(this)" />

                        <label class="pathsgrid__label"
                               for="${id}"
                               tabindex="0"
                               onkeydown="interactionLabel(event)">
                            <img src="${char.portrait}" alt="${char.name}'s Path">
                            <p>${char.name}</p>
                        </label>
                    </div>
                `);
            });
    }

    return { rebuild };
})();