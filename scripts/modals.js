function generateTestContent(id) {
    if (id === 'test1') return `<div class="test-table">
        <div class="row">
            <div class="cell id"><strong>ID</strong></div> 
            <div class="cell id-number">5</div>
            <div class="cell title"><strong>Názov</strong></div>
            <div class="cell title-text">Zmena rýchlosti simulácie</div>
        </div>

        <div class="row">
            <div class="cell use-case"><strong>Prípad použitia</strong></div> 
            <div class="cell use-case-number">UC05</div>
            <div class="cell acceptance-level"><strong>Úroveň splnenia testu</strong></div>
            <div class="cell acceptance-level-number"><s>Musí</s> - <s>Mal by</s> - Mohol by</div>
        </div>

        <div class="row">
            <div class="cell interface"><strong>Rozhranie</strong></div> 
            <div class="cell interface-text">GUI / Používateľ</div>
        </div>

        <div class="row">
            <div class="cell purpose"><strong>Účel</strong></div> 
            <div class="cell purpose-text">Overenie správneho zmenenia rýchlosti vizualizácie simulácie.</div>
        </div>

        <div class="row">
            <div class="cell output"><strong>Vstupné podmienky</strong></div> 
            <div class="cell output-text">Simulácia je pripravená, používateľ zmení rýchlosť.</div>
        </div>

        <div class="row">
            <div class="cell input"><strong>Výstupné podmineky</strong></div> 
            <div class="cell input-text">Simulácia sa vykonáva rýchlejšie alebo pomalšie podľa zvoleného násobiča rýchlosti.</div>
        </div>

        <div class="row">
            <div class="cell step"><strong>Krok</strong></div>
            <div class="cell action"><strong>Akcia</strong></div>
            <div class="cell expected"><strong>Očakávaná reakcia</strong></div>
            <div class="cell actual"><strong>Skutočná reakcia</strong></div>
        </div>

        <div class="row">
            <div class="cell step-number" data-label="Krok">1</div>
            <div class="cell action-text" data-label="Akcia">Používateľ spustí simuláciu</div>
            <div class="cell expected-text" data-label="Očak. R.">Simulácia beží v predvolenej rýchlosti</div>
            <div class="cell actual-text" data-label="Skut. R."></div>
        </div>

        <div class="row">
            <div class="cell step-number" data-label="Krok">2</div>
            <div class="cell action-text" data-label="Akcia">Používateľ zmení posuvník rýchlosti z 1× na 3×.</div>
            <div class="cell expected-text" data-label="Očak. R.">UI zobrazí novú hodnotu rýchlosti (všetky tlačítka v smere “vľavo“ od stlačeného, vrátane stlačeného zmenia farbu na žltú). Simulácia pokračuje v novej rýchlosti bez zastavovania.</div>
            <div class="cell actual-text" data-label="Skut. R."></div>
        </div>

        <div class="row">
            <div class="cell step-number" data-label="Krok">3.a</div>
            <div class="cell action-text" data-label="Akcia">Používateľ klikne na tlačidlo “Pause“</div>
            <div class="cell expected-text" data-label="Očak. R.">Simulácia sa zastaví, násobič rýchlosti sa nezmení. Pokračuj v bode 1.</div>
            <div class="cell actual-text" data-label="Skut. R."></div>
        </div>

        <div class="row">
            <div class="cell step-number" data-label="Krok">3.b</div>
            <div class="cell action-text" data-label="Akcia">Používateľ klikne na tlačidlo “Reset“</div>
            <div class="cell expected-text" data-label="Očak. R.">Systém vymaže bunky typu “visited-tile“ a “path“ ak existovali, zastaví simuláciu, vypíše v momente reštartu “Simulation reset“ a po reštarte vypíše “Simulation not started“. Rýchlosť sa nezmení – ostáva 3x. Pokračuj v bode 1.</div>
            <div class="cell actual-text" data-label="Skut. R."></div>
        </div>

        <div class="row">
            <div class="cell step-number" data-label="Krok">3.c</div>
            <div class="cell action-text" data-label="Akcia">Simulácia skoncí – buď sa nájde cieľ alebo sa nenájde a algoritmus uviazne. Používateľ zmení posuvník rýchlosti z 3× na 2×.</div>
            <div class="cell expected-text" data-label="Očak. R.">Systém vykoná zmenu rýchlosti. UI zobrazí zmenenú rýchlosť – odstáni zafarbenie tretieho štvorčeku rýchlosti (ostanú zafarbené iba 2 na žlto). Systém čaká na reštart.</div>
            <div class="cell actual-text" data-label="Skut. R."></div>
        </div>
    </div>`;
    if (id === 'test2') return `<ol><li>Place walls to block direct path</li><li>Run A*, expect alternative path found</li><li>Verify timing reported</li></ol>`;
    if (id === 'test3') return `<ol><li>Switch shape to circle</li><li>Run DFS, expect it terminates</li><li>Verify UI buttons re-enabled after run</li></ol>`;
    return `<ol><li>Example acceptance test</li></ol>`;
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modalOverlay');
    const titleEl = document.getElementById('modalTitle');
    const bodyEl = document.getElementById('modalBody');
    const closeBtn = document.getElementById('modalClose');
    const acceptBtn = document.getElementById('modalAccept');
    const cancelBtn = document.getElementById('modalCancel');

    if (!modal) return;

    function openModal(title, bodyHtml) {
        titleEl.textContent = title;
        bodyEl.innerHTML = bodyHtml;
        modal.classList.remove('hidden');
    }

    function closeModal() {
        modal.classList.add('hidden');
    }

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    document.querySelectorAll('.right-menu-button').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.test;
            const content = generateTestContent(id);
            openModal(btn.textContent.trim(), content);
        });
    });

    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
});
