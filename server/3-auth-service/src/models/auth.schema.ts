import { IAuthDocument } from '@hauxun/jobber-shared';
import { DataTypes, Model } from '@sequelize/core';
import { AllowNull, Attribute, BeforeCreate, Default, Index, NotNull, Table, Unique } from '@sequelize/core/decorators-legacy';
import { compare, hash } from 'bcrypt';
import { Optional } from 'sequelize';

const SALT_ROUND = 10;

type AuthUserCreationColumns = Optional<IAuthDocument, 'id' | 'createdAt' | 'passwordResetToken' | 'passwordResetExpires'>;

@Table({ modelName: 'auths' })
class AuthModel extends Model<IAuthDocument, AuthUserCreationColumns> {
  @Attribute(DataTypes.STRING)
  @NotNull
  @Index
  @Unique
  declare username: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare password: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare profilePublicId: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Index
  @Unique
  declare email: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare country: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare profilePicture: string;

  @Attribute(DataTypes.BOOLEAN)
  @Default(false)
  @NotNull
  declare emailVerified: boolean;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare browserName: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare deviceType: string;

  @Attribute(DataTypes.STRING)
  declare otp: string;

  @Attribute(DataTypes.DATE)
  @Default(new Date())
  @NotNull
  declare otpExpiration: Date;

  @Attribute(DataTypes.STRING)
  @AllowNull
  @Index
  @Unique
  declare emailVerificationToken: string;

  @Attribute(DataTypes.DATE)
  @Default(Date.now)
  declare createdAt: Date;

  @Attribute(DataTypes.STRING)
  @AllowNull
  declare passwordResetToken: string;

  @Attribute(DataTypes.DATE)
  @Default(new Date())
  @NotNull
  declare passwordResetExpires: Date;

  public static comparePassword = async function (password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  };

  public static hashPassword = async function (password: string): Promise<string> {
    return hash(password, SALT_ROUND);
  };

  @BeforeCreate
  static async hashPasswordEvent(auth: Model<IAuthDocument, AuthUserCreationColumns>) {
    const hashedPassword: string = await hash(auth.dataValues.password as string, SALT_ROUND);
    auth.dataValues.password = hashedPassword;
  }
}

export { AuthModel };
