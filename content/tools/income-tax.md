---
title: Income Tax Calculator
slug: income-tax
showMeta: false
showPagination: false
showTableOfContents: true
---
You can use this tool to calculate the income tax for any given amount.

> Note: These rates are specific to Turkey.

---
{{< rawhtml >}}

<script src="./main.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3/dist/cdn.min.js"></script>

<style>
#tax-calc * { box-sizing: border-box; }

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

.tc-pills { display: flex; gap: .5rem; flex-wrap: wrap; margin-bottom: 1.25rem; }
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

.tc-currency { font-weight: 600; font-size: .8rem; color: #94a3b8; flex-shrink: 0; }

.tc-divider { border: none; border-top: 1px solid #e2e8f0; margin: 1rem 0; }
.dark .tc-divider { border-color: #334155; }

.tc-option { margin-bottom: .75rem; }
.tc-option label { display: flex; align-items: center; gap: .5rem; cursor: pointer; font-weight: 500; font-size: .875rem; }
.tc-option-hint { font-size: .75rem; color: #94a3b8; padding-left: 1.5rem; margin-top: .15rem; }
.tc-option-custom { display: flex; align-items: center; gap: .5rem; padding-left: 1.5rem; margin-top: .4rem; }
.tc-input-xs { flex: none; width: 4.5rem; }

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
.tc-table tbody tr.tc-active td { background: #eff6ff; }
.dark .tc-table tbody tr.tc-active td { background: #0c1a2e; }

.tc-badge {
  display: inline-block;
  padding: .2rem .55rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: .72rem;
}
.tc-badge-15 { background: #dcfce7; color: #166534; }
.tc-badge-20 { background: #d1fae5; color: #065f46; }
.tc-badge-27 { background: #fef9c3; color: #854d0e; }
.tc-badge-35 { background: #ffedd5; color: #9a3412; }
.tc-badge-40 { background: #fee2e2; color: #991b1b; }
.dark .tc-badge-15 { background: #14532d; color: #bbf7d0; }
.dark .tc-badge-20 { background: #064e3b; color: #a7f3d0; }
.dark .tc-badge-27 { background: #422006; color: #fef08a; }
.dark .tc-badge-35 { background: #431407; color: #fed7aa; }
.dark .tc-badge-40 { background: #450a0a; color: #fecaca; }

.tc-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
.tc-summary-sub { font-size: .72rem; color: #94a3b8; margin-top: .2rem; }

.tc-summary-card.tc-card-tax { border-color: #fca5a5; }
.dark .tc-summary-card.tc-card-tax { border-color: #7f1d1d; }
.tc-card-tax .tc-summary-value { color: #dc2626; }
.dark .tc-card-tax .tc-summary-value { color: #f87171; }

.tc-summary-card.tc-card-net { border-color: #86efac; }
.dark .tc-summary-card.tc-card-net { border-color: #14532d; }
.tc-card-net .tc-summary-value { color: #16a34a; }
.dark .tc-card-net .tc-summary-value { color: #4ade80; }
</style>

<div id="tax-calc" x-data="taxCalculator">
  <div class="tc-layout">

    <!-- LEFT: Inputs -->
    <div class="tc-card">
      <div class="tc-section-label">Tax Year</div>
      <div class="tc-pills">
        <template x-for="year in ['2026', '2025', '2024', '2023', '2022']" :key="year">
          <label class="tc-pill">
            <input type="radio" name="taxYear" :value="year" x-model="taxYear" />
            <span x-text="year"></span>
          </label>
        </template>
      </div>

      <div class="tc-field">
        <div class="tc-field-name">Total Income</div>
        <div class="tc-field-value">
          <input class="tc-input" id="in-amount" type="text" x-model="rawAmount" placeholder="0" />
          <span class="tc-currency">TRY</span>
        </div>
      </div>

      <div class="tc-field" style="margin-bottom:0">
        <div class="tc-field-name">Tax-Deductible Expenses</div>
        <div class="tc-field-value">
          <input class="tc-input" id="in-expenses" type="text" x-model="expenses" placeholder="0" />
          <span class="tc-currency">TRY</span>
        </div>
      </div>

      <hr class="tc-divider" />

      <div class="tc-section-label">Tax Exemptions</div>

      <div class="tc-option">
        <label>
          <input type="checkbox" x-model="exemptExportSoftware" />
          <span>Eligible as a Software Exporter</span>
        </label>
        <div class="tc-option-custom" x-show="exemptExportSoftware">
          <input class="tc-input tc-input-xs" type="number" min="0" max="100" step="1"
                 x-model="customSoftwarePct"
                 :placeholder="taxData.softwareExemptPct" />
          <span class="tc-currency">%</span>
          <span class="tc-option-hint" style="padding-left:0;margin-top:0"
                x-show="customSoftwarePct === ''"
                x-text="'default for ' + taxYear"></span>
        </div>
      </div>

      <div class="tc-option" x-show="taxData.under29Amount > 0" style="margin-bottom:0">
        <label>
          <input type="checkbox" x-model="exemptUnder29" />
          <span>Under 29 years of age</span>
        </label>
        <div class="tc-option-hint" x-text="fmt(taxData.under29Amount) + ' flat exemption for ' + taxYear"></div>
      </div>
    </div>

    <!-- RIGHT: Results -->
    <div>
      <div class="tc-section-label">Tax Brackets</div>
      <div style="overflow-x:auto">
        <table class="tc-table">
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Rate</th>
              <th>Taxable Income</th>
              <th>Tax</th>
            </tr>
          </thead>
          <tbody>
            <template x-for="b in calc.breakdown" :key="b.min">
              <tr :class="b.hasIncome ? 'tc-active' : ''">
                <td x-text="b.min"></td>
                <td x-text="b.max"></td>
                <td><span class="tc-badge" :class="'tc-badge-' + b.rateNum" x-text="b.rate"></span></td>
                <td x-text="b.applicable"></td>
                <td x-text="b.tax"></td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <div class="tc-summary">
        <div class="tc-summary-card">
          <div class="tc-summary-label">Gross Income</div>
          <div class="tc-summary-value" x-text="fmt(income)"></div>
        </div>
        <div class="tc-summary-card tc-card-tax">
          <div class="tc-summary-label">Total Tax</div>
          <div class="tc-summary-value" x-text="fmt(calc.totalTax)"></div>
          <div class="tc-summary-sub" x-text="income > 0 ? fmtPct(calc.effectiveTaxRate) + ' effective rate' : ''"></div>
        </div>
        <div class="tc-summary-card tc-card-net">
          <div class="tc-summary-label">Net Income</div>
          <div class="tc-summary-value" x-text="fmt(calc.netIncome)"></div>
          <div class="tc-summary-sub" x-text="income > 0 ? fmt(calc.netIncome / 12) + ' / month' : ''"></div>
        </div>
      </div>
    </div>

  </div>
</div>

{{< /rawhtml >}}
