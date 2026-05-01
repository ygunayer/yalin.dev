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

<div x-data="taxCalculator">
  <h4>Input</h4>
  <table class="table-auto">
    <tbody>
      <tr>
        <th>Tax Year</th>
        <td class="radio-group">
          <template x-for="year in ['2026', '2025', '2024', '2023', '2022']" :key="year">
            <label>
              <input type="radio" name="taxYear" :value="year" x-model="taxYear" />
              <strong x-text="year"></strong>
            </label>
          </template>
        </td>
      </tr>
      <tr>
        <th><label for="in-amount">Total Income</label></th>
        <td>
          <input class="bordered rounded-md text-neutral-700" id="in-amount" type="text" x-model="rawAmount" />
          <strong style="margin-left:.5em">TRY</strong>
        </td>
      </tr>
      <tr>
        <th><label for="in-expenses">Tax-Deductible Expenses</label></th>
        <td>
          <input class="bordered rounded-md text-neutral-700" id="in-expenses" type="text" x-model="expenses" />
          <strong style="margin-left:.5em">TRY</strong>
        </td>
      </tr>
      <tr>
        <th>Tax Exemptions</th>
        <td>
          <div style="margin-bottom:1em">
            <label>
              <input type="checkbox" x-model="exemptExportSoftware" />
              <strong>Eligible as a Software Exporter</strong>
            </label>
            <div style="padding-left:24px" x-text="fmtPct(taxData.softwareExemptPct / 100) + ' exemption for ' + taxYear"></div>
          </div>
          <div x-show="taxData.under29Amount > 0">
            <label>
              <input type="checkbox" x-model="exemptUnder29" />
              <strong>Under 29 years of age</strong>
            </label>
            <div style="padding-left:24px" x-text="fmt(taxData.under29Amount) + ' exemption for ' + taxYear"></div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <h4>Calculation Results</h4>
  <table class="table-fixed">
    <thead>
      <tr style="text-align:center">
        <th colspan="3">Tax Rate Breakpoints</th>
        <th colspan="2">Amounts Subject to this Breakpoint</th>
      </tr>
      <tr>
        <th>Min. Amount</th>
        <th>Max. Amount</th>
        <th>Tax Rate</th>
        <th>Income</th>
        <th>Tax</th>
      </tr>
    </thead>
    <tbody>
      <template x-for="b in calc.breakdown" :key="b.min">
        <tr>
          <td x-text="b.min"></td>
          <td x-text="b.max"></td>
          <td x-text="b.rate"></td>
          <td x-text="b.applicable"></td>
          <td x-text="b.tax"></td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr style="border-top:1px solid #ccc">
        <th colspan="3">Total Income:</th>
        <th><strong x-text="fmt(income)"></strong></th>
        <th></th>
      </tr>
      <tr>
        <th colspan="3">Total Tax:</th>
        <th><strong x-text="fmt(-calc.totalTax)"></strong></th>
        <th><span x-text="income > 0 ? '(~' + fmtPct(calc.effectiveTaxRate) + ' effective)' : ''"></span></th>
      </tr>
      <tr style="border-top:1px solid #ccc">
        <th colspan="3">Net Income:</th>
        <th><span x-text="fmt(calc.netIncome)"></span></th>
        <th></th>
      </tr>
      <tr>
        <th colspan="3">Net Income (Monthly):</th>
        <th><span x-text="fmt(calc.netIncome / 12)"></span></th>
        <th></th>
      </tr>
    </tfoot>
  </table>
</div>

{{< /rawhtml >}}
