import { Routes } from '@angular/router';
import { UploadDataset } from './components/upload-dataset/upload-dataset';
import { VariableSelection } from './components/variable-selection/variable-selection';
import { DiscreteAnalysis } from './components/discrete-analysis/discrete-analysis';
import { ContinuousAnalysis } from './components/continuous-analysis/continuous-analysis';
import { ZTransform } from './components/z-transform/z-transform';
import { Transformations } from './components/transformations/transformations';
import { Report } from './components/report/report';

export const routes: Routes = [
  { path: '', redirectTo: 'upload', pathMatch: 'full' },

  { path: 'upload', component: UploadDataset },
  { path: 'variables', component: VariableSelection },
  { path: 'discrete', component: DiscreteAnalysis },
  { path: 'continuous', component: ContinuousAnalysis },
  { path: 'z', component: ZTransform },
  { path: 'transformations', component: Transformations },
  { path: 'report', component: Report },

  { path: '**', redirectTo: 'upload' },
];
