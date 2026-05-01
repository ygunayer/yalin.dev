const TAX_DATA = {
  2026: {
    brackets: [
      { max: 190000,   rate: 0.15 },
      { max: 400000,   rate: 0.20 },
      { max: 1500000,  rate: 0.27 },
      { max: 5300000,  rate: 0.35 },
      { max: Infinity, rate: 0.40 },
    ],
    softwareExemptPct: 100,
    under29Amount: 0,
  },
  2025: {
    brackets: [
      { max: 158000,   rate: 0.15 },
      { max: 330000,   rate: 0.20 },
      { max: 800000,   rate: 0.27 },
      { max: 4300000,  rate: 0.35 },
      { max: Infinity, rate: 0.40 },
    ],
    softwareExemptPct: 80,
    under29Amount: 330000,
  },
  2024: {
    brackets: [
      { max: 110000,   rate: 0.15 },
      { max: 230000,   rate: 0.20 },
      { max: 580000,   rate: 0.27 },
      { max: 3000000,  rate: 0.35 },
      { max: Infinity, rate: 0.40 },
    ],
    softwareExemptPct: 80,
    under29Amount: 230000,
  },
  2023: {
    brackets: [
      { max: 70000,    rate: 0.15 },
      { max: 150000,   rate: 0.20 },
      { max: 370000,   rate: 0.27 },
      { max: 1900000,  rate: 0.35 },
      { max: Infinity, rate: 0.40 },
    ],
    softwareExemptPct: 80,
    under29Amount: 150000,
  },
  2022: {
    brackets: [
      { max: 32000,    rate: 0.15 },
      { max: 70000,    rate: 0.20 },
      { max: 170000,   rate: 0.27 },
      { max: 880000,   rate: 0.35 },
      { max: Infinity, rate: 0.40 },
    ],
    softwareExemptPct: 50,
    under29Amount: 75000,
  },
};

const fmt = n =>
  isFinite(n)
    ? Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 }).format(n) + ' TRY'
    : '-';

const fmtPct = r => '%' + Math.round(r * 100);

document.addEventListener('alpine:init', () => {
  Alpine.data('taxCalculator', () => ({
    taxYear: '2026',
    rawAmount: '',
    expenses: '0',
    exemptExportSoftware: true,
    customSoftwarePct: '',
    exemptUnder29: false,

    init() {
      this.$watch('taxYear', () => { this.customSoftwarePct = ''; });
    },

    get taxData() {
      return TAX_DATA[this.taxYear];
    },

    get effectiveSoftwarePct() {
      if (!this.exemptExportSoftware) return 0;
      const custom = parseFloat(this.customSoftwarePct);
      return isFinite(custom) ? custom : this.taxData.softwareExemptPct;
    },

    get income() {
      const n = parseFloat(String(this.rawAmount).replace(/[^\d.]/g, ''));
      return isFinite(n) ? n : 0;
    },

    get calc() {
      const { income, exemptUnder29, taxData } = this;
      const expenses = parseFloat(this.expenses) || 0;
      const softwarePct = this.effectiveSoftwarePct;

      let taxable = income - expenses;
      if (softwarePct > 0) taxable *= 1 - softwarePct / 100;
      if (exemptUnder29 && taxData.under29Amount > 0) {
        taxable = Math.max(0, taxable - taxData.under29Amount);
      }

      let remaining = taxable;
      let totalTax = 0;

      const breakdown = taxData.brackets.map((b, i) => {
        const min = i === 0 ? 0 : taxData.brackets[i - 1].max;
        const applicable = Math.min(remaining, b.max - min);
        const tax = applicable * b.rate;
        remaining = Math.max(0, remaining - applicable);
        totalTax += tax;
        return {
          min: fmt(min),
          max: fmt(b.max),
          rate: fmtPct(b.rate),
          rateNum: Math.round(b.rate * 100),
          applicable: applicable > 0 ? fmt(applicable) : '-',
          tax: tax > 0 ? fmt(tax) : '-',
          hasIncome: applicable > 0,
        };
      });

      return {
        breakdown,
        totalTax,
        netIncome: income - totalTax,
        effectiveTaxRate: income > 0 ? totalTax / income : 0,
      };
    },

    fmt,
    fmtPct,
  }));
});
