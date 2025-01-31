import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListAnnouncementsComponent } from './list-announcements/list-announcements.component';
import { ActualityComponent } from '../actuality/actuality.component';
import { CreateActualityComponent } from './create-actuality/create-actuality.component';

const routes: Routes = [
  {
    path: '',
    component: ListAnnouncementsComponent, // Standalone component
  },
  {
    path: 'actualite',
    component: ActualityComponent, // Standalone component
  },
  {
    path: 'list-annonces',
    component: ListAnnouncementsComponent, // Standalone component
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ListAnnouncementsComponent, // Importer le composant standalone
    ActualityComponent, // Importer le composant standalone
    CreateActualityComponent, // Importer le composant standalone
  ],
})
export class AnnouncementsModule {}
