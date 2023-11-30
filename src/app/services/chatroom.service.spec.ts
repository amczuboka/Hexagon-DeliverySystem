import { TestBed } from '@angular/core/testing';

import { ChatroomService } from './chatroom.service';

import { getDatabase, ref, query, get } from 'firebase/database';

describe('ChatroomService', () => {
  let service: ChatroomService;
  let db: any;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatroomService);
    db = getDatabase();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
