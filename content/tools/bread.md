---
title: Bread Calculator
layout: simple
showMeta: false
showPagination: false
showTableOfContents: false
---
You can use this tool to calculate the ingredient amounts for baking bread. If you're not familiar with some of the terms, refer to the [glossary section](#glossary)

{{< rawhtml >}}

<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3/dist/cdn.min.js"></script>
<script>
document.addEventListener('alpine:init', () => {
  Alpine.data('breadCalculator', () => ({
    mode: 'yield',
    starterAmount: '150',
    starterHydration: '100',
    flour: '',
    water: '',
    targetWeight: '',
    targetHydration: '',

    get levainFlour() {
      const amt = parseFloat(this.starterAmount) || 0;
      const hyd = (parseFloat(this.starterHydration) || 0) / 100;
      return amt / (1 + hyd);
    },
    get levainWater() {
      return (parseFloat(this.starterAmount) || 0) - this.levainFlour;
    },

    get totalFlour() {
      if (this.mode === 'yield') return this.levainFlour + (parseFloat(this.flour) || 0);
      const w = parseFloat(this.targetWeight) || 0;
      const h = (parseFloat(this.targetHydration) || 0) / 100;
      return w / (1 + h);
    },
    get totalWater() {
      if (this.mode === 'yield') return this.levainWater + (parseFloat(this.water) || 0);
      return (parseFloat(this.targetWeight) || 0) - this.totalFlour;
    },

    get breadWeight() { return this.totalFlour + this.totalWater; },
    get hydration()   { return this.totalFlour > 0 ? 100 * this.totalWater / this.totalFlour : 0; },

    get directFlour() { return parseFloat(this.flour) || 0; },
    get directWater()  { return parseFloat(this.water) || 0; },
    get neededFlour() { return Math.max(0, this.totalFlour - this.levainFlour); },
    get neededWater() { return Math.max(0, this.totalWater - this.levainWater); },

    fmtG:   n => n > 0 ? Math.round(n) + ' g' : '-',
    fmtPct: n => n > 0 ? n.toFixed(1) + '%'   : '-',
  }));
});
</script>

<style>
#bread-calc * { box-sizing: border-box; }

.tc-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.75fr);
  gap: 1.5rem;
  align-items: start;
}
@media (max-width: 640px) {
  .tc-layout { grid-template-columns: 1fr; }
}

.tc-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: .75rem;
  padding: 1.25rem;
}
.dark .tc-card { background: #1e293b; border-color: #334155; }

.tc-section-label {
  font-size: .7rem;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: #94a3b8;
  margin-bottom: .625rem;
}

.tc-pills { display: flex; gap: .5rem; flex-wrap: wrap; }
.tc-pill { cursor: pointer; }
.tc-pill input { position: absolute; opacity: 0; width: 0; height: 0; }
.tc-pill span {
  display: inline-block;
  padding: .3rem 1rem;
  border-radius: 9999px;
  font-size: .875rem;
  font-weight: 600;
  background: #e2e8f0;
  color: #64748b;
  transition: background .15s, color .15s;
  user-select: none;
}
.dark .tc-pill span { background: #334155; color: #94a3b8; }
.tc-pill input:checked + span { background: #3b82f6; color: #fff; }

.tc-field { margin-bottom: 1rem; }
.tc-field-name { font-weight: 500; font-size: .8rem; color: #64748b; margin-bottom: .3rem; }
.dark .tc-field-name { color: #94a3b8; }
.tc-field-value { display: flex; align-items: center; gap: .5rem; }

.tc-input {
  flex: 1;
  min-width: 0;
  padding: .4rem .7rem;
  border: 1px solid #cbd5e1;
  border-radius: .375rem;
  font-size: .875rem;
  color: #1e293b;
  background: #fff;
}
.dark .tc-input { background: #0f172a; border-color: #475569; color: #e2e8f0; }
.tc-input:focus { outline: 2px solid #3b82f6; outline-offset: 1px; border-color: transparent; }

.tc-unit { font-weight: 600; font-size: .8rem; color: #94a3b8; flex-shrink: 0; }

.tc-divider { border: none; border-top: 1px solid #e2e8f0; margin: 1rem 0; }
.dark .tc-divider { border-color: #334155; }

.tc-table { width: 100%; border-collapse: collapse; font-size: .875rem; }
.tc-table thead th {
  padding: .5rem .625rem;
  text-align: left;
  font-weight: 700;
  font-size: .7rem;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: #94a3b8;
  border-bottom: 2px solid #e2e8f0;
  white-space: nowrap;
}
.dark .tc-table thead th { border-color: #334155; }
.tc-table tbody td {
  padding: .45rem .625rem;
  border-bottom: 1px solid #f1f5f9;
  color: #374151;
  white-space: nowrap;
}
.dark .tc-table tbody td { border-color: #1e293b; color: #cbd5e1; }
.tc-table tfoot td {
  padding: .5rem .625rem;
  font-weight: 700;
  border-top: 2px solid #e2e8f0;
  color: #0f172a;
  white-space: nowrap;
}
.dark .tc-table tfoot td { border-color: #334155; color: #f1f5f9; }

.tc-summary {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: .75rem;
  margin-top: 1rem;
}
@media (max-width: 480px) {
  .tc-summary { grid-template-columns: 1fr; }
}

.tc-summary-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: .75rem;
  padding: .875rem 1rem;
}
.dark .tc-summary-card { background: #1e293b; border-color: #334155; }
.tc-summary-label {
  font-size: .68rem;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: #94a3b8;
  margin-bottom: .25rem;
}
.tc-summary-value { font-size: 1rem; font-weight: 700; color: #0f172a; }
.dark .tc-summary-value { color: #f1f5f9; }
</style>

<div id="bread-calc" x-data="breadCalculator">
  <div class="tc-layout">

    <!-- LEFT: Inputs -->
    <div class="tc-card">
      <div class="tc-section-label" style="margin-bottom:.625rem">Mode</div>
      <div class="tc-pills" style="margin-bottom:1.25rem">
        <label class="tc-pill">
          <input type="radio" name="mode" value="yield" x-model="mode" />
          <span>Calculate Yield</span>
        </label>
        <label class="tc-pill">
          <input type="radio" name="mode" value="ingredients" x-model="mode" />
          <span>Calculate Ingredients</span>
        </label>
      </div>

      <div class="tc-section-label">Levain</div>
      <div class="tc-field">
        <div class="tc-field-name">Amount</div>
        <div class="tc-field-value">
          <input class="tc-input" type="text" x-model="starterAmount" placeholder="150" />
          <span class="tc-unit">g</span>
        </div>
      </div>
      <div class="tc-field" style="margin-bottom:0">
        <div class="tc-field-name">Hydration</div>
        <div class="tc-field-value">
          <input class="tc-input" type="text" x-model="starterHydration" placeholder="100" />
          <span class="tc-unit">%</span>
        </div>
      </div>

      <hr class="tc-divider" />

      <template x-if="mode === 'yield'">
        <div>
          <div class="tc-section-label">Ingredients</div>
          <div class="tc-field">
            <div class="tc-field-name">Flour</div>
            <div class="tc-field-value">
              <input class="tc-input" type="text" x-model="flour" placeholder="0" />
              <span class="tc-unit">g</span>
            </div>
          </div>
          <div class="tc-field" style="margin-bottom:0">
            <div class="tc-field-name">Water</div>
            <div class="tc-field-value">
              <input class="tc-input" type="text" x-model="water" placeholder="0" />
              <span class="tc-unit">g</span>
            </div>
          </div>
        </div>
      </template>

      <template x-if="mode === 'ingredients'">
        <div>
          <div class="tc-section-label">Target Yield</div>
          <div class="tc-field">
            <div class="tc-field-name">Bread Weight</div>
            <div class="tc-field-value">
              <input class="tc-input" type="text" x-model="targetWeight" placeholder="0" />
              <span class="tc-unit">g</span>
            </div>
          </div>
          <div class="tc-field" style="margin-bottom:0">
            <div class="tc-field-name">Hydration</div>
            <div class="tc-field-value">
              <input class="tc-input" type="text" x-model="targetHydration" placeholder="75" />
              <span class="tc-unit">%</span>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- RIGHT: Results -->
    <div>
      <div class="tc-section-label">Breakdown</div>
      <table class="tc-table">
        <thead>
          <tr>
            <th></th>
            <th>Flour</th>
            <th>Water</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Levain</strong></td>
            <td x-text="fmtG(levainFlour)"></td>
            <td x-text="fmtG(levainWater)"></td>
            <td x-text="fmtG(levainFlour + levainWater)"></td>
          </tr>
          <tr>
            <td><strong x-text="mode === 'yield' ? 'Direct' : 'Needed'"></strong></td>
            <td x-text="fmtG(mode === 'yield' ? directFlour : neededFlour)"></td>
            <td x-text="fmtG(mode === 'yield' ? directWater : neededWater)"></td>
            <td x-text="fmtG(mode === 'yield' ? directFlour + directWater : neededFlour + neededWater)"></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td x-text="fmtG(totalFlour)"></td>
            <td x-text="fmtG(totalWater)"></td>
            <td x-text="fmtG(breadWeight)"></td>
          </tr>
        </tfoot>
      </table>

      <!-- Yield mode: show bread weight + hydration -->
      <div class="tc-summary" x-show="mode === 'yield'">
        <div class="tc-summary-card">
          <div class="tc-summary-label">Bread Weight</div>
          <div class="tc-summary-value" x-text="fmtG(breadWeight)"></div>
        </div>
        <div class="tc-summary-card">
          <div class="tc-summary-label">Hydration</div>
          <div class="tc-summary-value" x-text="fmtPct(hydration)"></div>
        </div>
      </div>

      <!-- Ingredients mode: show flour + water needed -->
      <div class="tc-summary" x-show="mode === 'ingredients'">
        <div class="tc-summary-card">
          <div class="tc-summary-label">Flour Needed</div>
          <div class="tc-summary-value" x-text="fmtG(neededFlour)"></div>
        </div>
        <div class="tc-summary-card">
          <div class="tc-summary-label">Water Needed</div>
          <div class="tc-summary-value" x-text="fmtG(neededWater)"></div>
        </div>
      </div>
    </div>

  </div>
</div>

{{< /rawhtml >}}

## Glossary
Autolyze
: Process of mixing water and flour before adding the levain or salt.

Baker's Percentage
: A method of representing ingredient amounts as a percentage of the total amount of flour in a mixture.<br />See the following table for an example:

| Ingredient | Actual Amount | Real Percentage | Baker's Percentage |
|------------|:-------------:|:---------------:|:------------------:|
| White Flour | 100g | 32.9% | 50% |
| Whole Wheat Flour | 100g | 32.9% | 50% |
| Water | 100g | 32.9% | 50% |
| Salt | 4g | 1.3% | 2% |

Hydration
: The ratio of flour to water in a mixture, in baker's percentages.

Levain
: A sourdough starter that's been recently fed and matured. Levain is typically added to the flour and water mixture when it reaches its peak rise.

Starter
: Also called a sourdough starter, a mixture of flour and water that has developed yeast and become acidic, gaining a sour smell and taste.
