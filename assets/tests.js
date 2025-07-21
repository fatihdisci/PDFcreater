window.sampleTexts = {
  lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et lorem in metus cursus tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
  turkish: 'Pijamal\u0131 hasta ya\u011f\u0131z \u015fof\u00f6re \u00e7abucak g\u00fcvendi.',
  fivePage() {
    return Array(20).fill(this.lorem).join('\n\n');
  }
};
