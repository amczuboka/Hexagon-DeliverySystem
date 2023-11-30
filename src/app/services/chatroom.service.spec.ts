import { TestBed } from '@angular/core/testing';

import { ChatroomService } from './chatroom.service';

import { getDatabase, ref, query, get } from 'firebase/database';
import { AppModule } from '../app.module';

describe('ChatroomService', () => {
  let service: ChatroomService;
  let db: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
    service = TestBed.inject(ChatroomService);
    db = getDatabase();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
