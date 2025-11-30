import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatasetService } from '../../services/dataset';

@Component({
  selector: 'app-variable-selection',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './variable-selection.html',
  styleUrl: './variable-selection.scss',
})
export class VariableSelection {
  public datasetService = inject(DatasetService);

  selectedCont = '';
  selectedDisc = '';

  constructor() {
    this.selectedCont = this.datasetService.selectedContinuousColumn();
    this.selectedDisc = this.datasetService.selectedDiscreteColumn();
  }

  onSelectionChange() {
    this.datasetService.selectedContinuousColumn.set(this.selectedCont);
    this.datasetService.selectedDiscreteColumn.set(this.selectedDisc);
  }
}
