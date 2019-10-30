import { Component, OnInit } from '@angular/core';
import { JobService } from '../Job.service';
import { Job } from 'src/app/_models/Job';
import { ToastrService } from 'ngx-toastr';
import { IntDto } from 'src/app/_models/Dtos/IntDto';

@Component({
  selector: 'app-job',
  templateUrl: './Job.component.html',
  styleUrls: ['./Job.component.css']
})
export class JobComponent implements OnInit {
  busca: number;
  Jobs: Job[];
  constructor(private jobService: JobService,
              private toastrService: ToastrService
    ) { }

  ngOnInit() {
  }
  getJobsByUser(x: number) {
    console.table(x);
    this.jobService.getJobsByUser(x).subscribe(( jobs: Job[]) => {
      this.Jobs = jobs;
      console.log(jobs);
    }, error => {
      this.toastrService.error(`erro ao buscar ${error}`);
    });
  }
}
