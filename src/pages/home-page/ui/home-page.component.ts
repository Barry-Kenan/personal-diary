import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from '@entities';
import { Note } from '@shared/models';
import { AuthService, NotesService } from '@shared/services';
import { LayoutComponent } from '@widgets';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { filter, firstValueFrom, map, pairwise, throttleTime } from 'rxjs';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    LayoutComponent,
    CardComponent,
    RouterModule,
    ProgressSpinnerModule,
    ScrollingModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, AfterViewInit {
  @ViewChild(CdkVirtualScrollViewport) public scroller!: CdkVirtualScrollViewport;
  public notes!: Note[];
  public loading: boolean;

  constructor(
    private noteService: NotesService,
    private authService: AuthService,
    private ngZone: NgZone
  ) {
    this.loading = false;
  }

  public ngOnInit(): void {
    this.getAllNotes();
  }

  public ngAfterViewInit(): void {
    this.scroller
      .elementScrolled()
      .pipe(
        map(() => this.scroller.measureScrollOffset('bottom')),
        pairwise(),
        filter(([y1, y2]) => y2 < y1 && y2 < 426),
        throttleTime(200)
      )
      .subscribe(() => {
        this.ngZone.run(() => {
          this.getAllFiles();
        });
      });
  }
  getAllFiles() {
    throw new Error('Method not implemented.');
  }

  private async getAllNotes(): Promise<void> {
    this.loading = true;
    const userEmail = await firstValueFrom(this.authService.user$.pipe(map(e => e?.email)));

    this.noteService.getAllNotes(userEmail as string).subscribe(data => {
      this.notes = data.sort((a, b) => b.changedDate.valueOf() - a.changedDate.valueOf());
      this.loading = false;
    });
  }
}
