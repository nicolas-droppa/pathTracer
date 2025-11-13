function generateTestContent(id) {
    if (id === 'test1') return `<div class="test-table">
        <div class="row">
            <div class="cell id"><strong>ID</strong></div> 
            <div class="cell id-number">1</div>
            <div class="cell title"><strong>Názov</strong></div>
            <div class="cell title-text">Výber typu bunky “wall“ – kreslenie mriežky</div>
        </div>

        <div class="row">
            <div class="cell use-case"><strong>Prípad použitia</strong></div> 
            <div class="cell use-case-number">UC01</div>
            <div class="cell acceptance-level"><strong>Úroveň splnenia testu</strong></div>
            <div class="cell acceptance-level-number">Musí – <s>Mal by</s> – <s>Mohol by</s></div>
        </div>

        <div class="row">
            <div class="cell interface"><strong>Rozhranie</strong></div> 
            <div class="cell interface-text">GUI / Používateľ</div>
        </div>

        <div class="row">
            <div class="cell purpose"><strong>Účel</strong></div> 
            <div class="cell purpose-text">Overenie správnej funkčnosti výberu typu bunky “wall“ a jeho zmeny kliknutím na mriežku.</div>
        </div>

        <div class="row">
            <div class="cell output"><strong>Vstupné podmienky</strong></div> 
            <div class="cell output-text">Spustená aplikácia so zobrazenou mriežkou.</div>
        </div>

        <div class="row">
            <div class="cell input"><strong>Výstupné podmineky</strong></div> 
            <div class="cell input-text">Zvolená bunka zmení typ na “wall“.</div>
        </div>

        <div class="row">
            <div class="cell step"><strong>Krok</strong></div>
            <div class="cell action"><strong>Akcia</strong></div>
            <div class="cell expected"><strong>Očakávaná reakcia</strong></div>
            <div class="cell actual"><strong>Skutočná reakcia</strong></div>
        </div>

        <div class="row">
            <div class="cell step-number" data-label="Krok">1</div>
            <div class="cell action-text" data-label="Akcia">Používateľ vyberie typ bunky „wall“.</div>
            <div class="cell expected-text" data-label="Očak. R.">V UI sa zvýrazní možnosť „wall“.</div>
            <div class="cell actual-text" data-label="Skut. R."></div>
        </div>

        <div class="row">
            <div class="cell step-number" data-label="Krok">2.a</div>
            <div class="cell action-text" data-label="Akcia">Používateľ klikne na ľubovoľnú bunku v mriežke.</div>
            <div class="cell expected-text" data-label="Očak. R.">Bunke sa zmení farba a typ na „wall“.</div>
            <div class="cell actual-text" data-label="Skut. R."></div>
        </div>

        <div class="row">
            <div class="cell step-number" data-label="Krok">2.b</div>
            <div class="cell action-text" data-label="Akcia">Používateľ klikne na ľubovolné iné miesto ako bunku v mriežke.</div>
            <div class="cell expected-text" data-label="Očak. R.">Systém vykoná akciu na ktorú používateľ klikol a zruší aktuálny výber bunky.</div>
            <div class="cell actual-text" data-label="Skut. R."></div>
        </div>

        <div class="row">
            <div class="cell step-number" data-label="Krok">2.c</div>
            <div class="cell action-text" data-label="Akcia">Používateľ klikne na bunku typu “wall“ už vyobrazenú v mriežke.</div>
            <div class="cell expected-text" data-label="Očak. R.">Systém nevykoná nič – ignoruje takýto výber.</div>
            <div class="cell actual-text" data-label="Skut. R."></div>
        </div>

        <div class="row">
            <div class="cell step-number" data-label="Krok">2.d</div>
            <div class="cell action-text" data-label="Akcia">Používateľ klikne na bunku typu “start“ už vyobrazenú v mriežke.</div>
            <div class="cell expected-text" data-label="Očak. R.">Bunke sa zmení farba a typ na „wall“. Systém zmení pozíciu start v štruktúre na x: null, y: null.</div>
            <div class="cell actual-text" data-label="Skut. R."></div>
        </div>

        <div class="row">
            <div class="cell step-number" data-label="Krok">2.e</div>
            <div class="cell action-text" data-label="Akcia">Používateľ klikne na bunku typu “finish“ už vyobrazenú v mriežke.</div>
            <div class="cell expected-text" data-label="Očak. R.">Bunke sa zmení farba a typ na „wall“. Systém zmení pozíciu finish v štruktúre na x: null, y: null.</div>
            <div class="cell actual-text" data-label="Skut. R."></div>
        </div>
    </div>`;

    if (id === 'test2') return `<div class="test-table">
    <div class="row">
        <div class="cell id"><strong>ID</strong></div> 
        <div class="cell id-number">2</div>
        <div class="cell title"><strong>Názov</strong></div>
        <div class="cell title-text">Spustenie simulácie algoritmu</div>
    </div>

    <div class="row">
        <div class="cell use-case"><strong>Prípad použitia</strong></div> 
        <div class="cell use-case-number">UC02</div>
        <div class="cell acceptance-level"><strong>Úroveň splnenia testu</strong></div>
        <div class="cell acceptance-level-number">Musí – <s>Mal by</s> – <s>Mohol by</s></div>
    </div>

    <div class="row">
        <div class="cell interface"><strong>Rozhranie</strong></div> 
        <div class="cell interface-text">GUI / Používateľ</div>
    </div>

    <div class="row">
        <div class="cell purpose"><strong>Účel</strong></div> 
        <div class="cell purpose-text">Overenie správneho spustenia simulácie po výbere algoritmu a nastavení mriežky.</div>
    </div>

    <div class="row">
        <div class="cell output"><strong>Vstupné podmienky</strong></div> 
        <div class="cell output-text">Počiatočná („start“) a cieľová („finish“) bunka sú zvolené, algoritmus je vybraný.</div>
    </div>

    <div class="row">
        <div class="cell input"><strong>Výstupné podmineky</strong></div> 
        <div class="cell input-text">Simulácia začne a systém postupne vizualizuje kroky algoritmu.</div>
    </div>

    <div class="row">
        <div class="cell step"><strong>Krok</strong></div>
        <div class="cell action"><strong>Akcia</strong></div>
        <div class="cell expected"><strong>Očakávaná reakcia</strong></div>
        <div class="cell actual"><strong>Skutočná reakcia</strong></div>
    </div>

    <div class="row">
        <div class="cell step-number" data-label="Krok">1</div>
        <div class="cell action-text" data-label="Akcia">Používateľ vyberie algoritmus „BFS“.</div>
        <div class="cell expected-text" data-label="Očak. R.">V používateľskom rozhraní sa zvýrazní vybraný algoritmus.</div>
        <div class="cell actual-text" data-label="Skut. R."></div>
    </div>

    <div class="row">
        <div class="cell step-number" data-label="Krok">2</div>
        <div class="cell action-text" data-label="Akcia">Používateľ klikne na tlačidlo „Start“.</div>
        <div class="cell expected-text" data-label="Očak. R.">Simulácia sa spustí a tlačidlá pre úpravu mriežky sa zneaktívnia.</div>
        <div class="cell actual-text" data-label="Skut. R."></div>
    </div>

    <div class="row">
        <div class="cell step-number" data-label="Krok">3</div>
        <div class="cell action-text" data-label="Akcia">Systém začne vykonávať algoritmus.</div>
        <div class="cell expected-text" data-label="Očak. R.">Bunky sa postupne zvýrazňujú podľa krokov algoritmu, pričom animácia zodpovedá nastavenej rýchlosti.</div>
        <div class="cell actual-text" data-label="Skut. R."></div>
    </div>

    <div class="row">
        <div class="cell step-number" data-label="Krok">4.a</div>
        <div class="cell action-text" data-label="Akcia">Cesta sa nájde.</div>
        <div class="cell expected-text" data-label="Očak. R.">Systém vizualizuje cestu medzi bunkami „start“ a „finish“ žltou farbou, zobrazí oznámenie o úspešnom nájdení cieľa a sprístupní iba tlačidlá „Reštart“ a „Rýchlosť“.</div>
        <div class="cell actual-text" data-label="Skut. R."></div>
    </div>

    <div class="row">
        <div class="cell step-number" data-label="Krok">4.b</div>
        <div class="cell action-text" data-label="Akcia">Cesta sa nenájde.</div>
        <div class="cell expected-text" data-label="Očak. R.">Systém zobrazí oznámenie o nenájdení cieľa a sprístupní iba tlačídlá “Reštart“ a “Rýchlosť“.</div>
        <div class="cell actual-text" data-label="Skut. R."></div>
    </div>
</div>`;

    if (id === 'test3') return `<div class="test-table">
    <div class="row">
        <div class="cell id"><strong>ID</strong></div> 
        <div class="cell id-number">3</div>
        <div class="cell title"><strong>Názov</strong></div>
        <div class="cell title-text">Pozastavenie a pokračovanie simulácie</div>
    </div>

    <div class="row">
        <div class="cell use-case"><strong>Prípad použitia</strong></div> 
        <div class="cell use-case-number">UC03</div>
        <div class="cell acceptance-level"><strong>Úroveň splnenia testu</strong></div>
        <div class="cell acceptance-level-number"><s>Musí</s> – Mal by – <s>Mohol by</s></div>
    </div>

    <div class="row">
        <div class="cell interface"><strong>Rozhranie</strong></div> 
        <div class="cell interface-text">GUI / Používateľ</div>
    </div>

    <div class="row">
        <div class="cell purpose"><strong>Účel</strong></div> 
        <div class="cell purpose-text">Overenie správneho pozastavenia a následného pokračovania simulácie.</div>
    </div>

    <div class="row">
        <div class="cell output"><strong>Vstupné podmienky</strong></div> 
        <div class="cell output-text">Spustená simulácia.</div>
    </div>

    <div class="row">
        <div class="cell input"><strong>Výstupné podmineky</strong></div> 
        <div class="cell input-text">Simulácia sa dá zastaviť a obnoviť bez straty stavu.</div>
    </div>

    <div class="row">
        <div class="cell step"><strong>Krok</strong></div>
        <div class="cell action"><strong>Akcia</strong></div>
        <div class="cell expected"><strong>Očakávaná reakcia</strong></div>
        <div class="cell actual"><strong>Skutočná reakcia</strong></div>
    </div>

    <div class="row">
        <div class="cell step-number" data-label="Krok">1</div>
        <div class="cell action-text" data-label="Akcia">Používateľ klikne na tlačidlo „Pauza“.</div>
        <div class="cell expected-text" data-label="Očak. R.">Simulácia sa pozastaví a časovač sa zastaví.</div>
        <div class="cell actual-text" data-label="Skut. R."></div>
    </div>

    <div class="row">
        <div class="cell step-number" data-label="Krok">2.a</div>
        <div class="cell action-text" data-label="Akcia">Používateľ klikne na tlačidlo „Pokračovať“.</div>
        <div class="cell expected-text" data-label="Očak. R.">Simulácia pokračuje v mieste, kde bola zastavená.</div>
        <div class="cell actual-text" data-label="Skut. R."></div>
    </div>

    <div class="row">
        <div class="cell step-number" data-label="Krok">2.b</div>
        <div class="cell action-text" data-label="Akcia">Používateľ klikne na tlačidlo „Reštart“.</div>
        <div class="cell expected-text" data-label="Očak. R.">Simulácia sa reštartuje od začiatku a pokračuje sa bodom 1.</div>
        <div class="cell actual-text" data-label="Skut. R."></div>
    </div>

    <div class="row">
        <div class="cell step-number" data-label="Krok">2.c</div>
        <div class="cell action-text" data-label="Akcia">Používateľ klikne na tlačidlo „Rýchlosť“.</div>
        <div class="cell expected-text" data-label="Očak. R.">Systém zmení rýchlosť simulácie. Simulácia nebude odpauzovaná.</div>
        <div class="cell actual-text" data-label="Skut. R."></div>
    </div>
</div>`;

if (id === 'test4') return `<div class="test-table">
    <div class="row">
        <div class="cell id"><strong>ID</strong></div> 
        <div class="cell id-number">4</div>
        <div class="cell title"><strong>Názov</strong></div>
        <div class="cell title-text">Resetovanie mriežky</div>
    </div>

    <div class="row">
        <div class="cell use-case"><strong>Prípad použitia</strong></div> 
        <div class="cell use-case-number">UC04</div>
        <div class="cell acceptance-level"><strong>Úroveň splnenia testu</strong></div>
        <div class="cell acceptance-level-number">Musí – <s>Mal by</s> – <s>Mohol by</s></div>
    </div>

    <div class="row">
        <div class="cell interface"><strong>Rozhranie</strong></div> 
        <div class="cell interface-text">GUI / Používateľ</div>
    </div>

    <div class="row">
        <div class="cell purpose"><strong>Účel</strong></div> 
        <div class="cell purpose-text">Overenie správnej funkcie resetu mriežky do pôvodného stavu.</div>
    </div>

    <div class="row">
        <div class="cell output"><strong>Vstupné podmienky</strong></div> 
        <div class="cell output-text">Mriežka obsahuje typy buniek “start“, “finish“, “wall“, “ground“ a “visited-tile“, zároveň bola spustená simulácia (aktuálne prebieha).</div>
    </div>

    <div class="row">
        <div class="cell input"><strong>Výstupné podmineky</strong></div> 
        <div class="cell input-text">Mriežka sa vyčistí a vráti do stavu pred spustením simulácie.</div>
    </div>

    <div class="row">
        <div class="cell step"><strong>Krok</strong></div>
        <div class="cell action"><strong>Akcia</strong></div>
        <div class="cell expected"><strong>Očakávaná reakcia</strong></div>
        <div class="cell actual"><strong>Skutočná reakcia</strong></div>
    </div>

    <div class="row">
        <div class="cell step-number" data-label="Krok">1</div>
        <div class="cell action-text" data-label="Akcia">Používateľ klikne na tlačidlo „Reset“.</div>
        <div class="cell expected-text" data-label="Očak. R.">Systém vymaže všetky typy buniek, zastaví simuláciu, vypíše v momente reštartu “Simulation reset“ a po reštarte vypíše “Simulation not started“. Používateľ vidí prázdnu mriežku pripravenú na nové úpravy.</div>
        <div class="cell actual-text" data-label="Skut. R."></div>
    </div>
</div>`;


    if (id === 'test5') return `<div class="test-table">
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
            <div class="cell expected-text" data-label="Očak. R.">UI zobrazí novú hodnotu rýchlosti (všetky tlačítka v smere “vľavo“ od stlačeného, vrátane stlačeného zmenia farbu na žltú). Simulácia sa zastaví a čaká. Pokračuj v bode 1.</div>
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
