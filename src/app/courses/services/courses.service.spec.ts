import { CoursesService } from './courses.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { COURSES } from '../../../../server/db-data';

describe('CoursesService', () => {
  let coursesServiceMock: CoursesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService]
    });

    coursesServiceMock = TestBed.get(CoursesService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should retrieve all courses', () => {
    coursesServiceMock.findAllCourses().subscribe(courses => {
      expect(courses).toBeTruthy('No Courses Returned');

      expect(courses.length).toBe(12, 'incorrect number of courses');

      const course = courses.find(course => course.id === 12);

      expect(course.titles.description).toBe('Angular Testing Course');
    });

    const testReq = httpTestingController.expectOne('/api/courses');

    expect(testReq.request.method).toEqual('GET');

    testReq.flush({ payload: Object.values(COURSES) });
  });

  it('should find a course by id', () => {
    coursesServiceMock.findCourseById(12).subscribe(course => {
      expect(course).toBeTruthy();
      expect(course.id).toBe(12);
    });

    const testReq = httpTestingController.expectOne('/api/courses/12');

    expect(testReq.request.method).toEqual('GET');

    testReq.flush(COURSES[12]);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
