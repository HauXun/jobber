import crypto from 'crypto';

import { createAuthUser, getUserByUsernameOrEmail } from '@auth/services/auth.service';
import { faker } from '@faker-js/faker';
import { BadRequestError, IAuthDocument, firstLetterUppercase, lowerCase } from '@hauxun/jobber-shared';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { sample } from 'lodash';
import { generateUsername } from 'unique-username-generator';
import { v4 as uuidV4 } from 'uuid';

// The locale data for vi language are missing in this locale. 
// const faker = new Faker({
//     locale: [vi]
// });

export async function create(req: Request, res: Response): Promise<void> {
  const { count } = req.params;
  console.log('params in auth svc', count);
  const usernames: string[] = [];

  for(let i = 0; i < parseInt(count, 10); i++) {
    const username: string = generateUsername('', 0, 12);

    usernames.push(firstLetterUppercase(username));
  }

  for(let i = 0; i < usernames.length; i++) {
    const username = usernames[i];
    const email = faker.internet.email();
    
    const checkIfUserExist: IAuthDocument | undefined = await getUserByUsernameOrEmail(username, email);

    if (checkIfUserExist) {
      throw new BadRequestError('Invalid credentials. Email or Username', 'Seed create() method error');
    }

    const password = 'qwerty';
    const country = faker.location.country();
    const profilePicture = faker.image.urlPicsumPhotos();
    const profilePublicId = uuidV4();
    const randomBytes: Buffer = await Promise.resolve(crypto.randomBytes(20));
    const randomCharacters: string = randomBytes.toString('hex');
    const authData: IAuthDocument = {
      username: firstLetterUppercase(username),
      email: lowerCase(email),
      profilePublicId,
      password,
      country,
      profilePicture,
      emailVerificationToken: randomCharacters,
      emailVerified: sample([false, true]),
      browserName: 'Chrome',
      deviceType: 'mobile',
    } as IAuthDocument;
    
    await createAuthUser(authData);
  }

  res.status(StatusCodes.OK).json({ message: 'Seed users created successfully.' });
}