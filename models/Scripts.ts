import mongoose, { model, Schema, models } from 'mongoose'

enum Genres {
  Crime = 'Crime',
  Psychological = 'Psychological',
  Romance = 'Romance',
  RomCom = 'RomCom',
  SitCom = 'SitCom',
  Thriller = 'Thriller',
  Mystery = 'Mystery',
  Fantasy = 'Fantasy',
  SciFi = 'Sci-Fi',
  Horror = 'Horror',
  Action = 'Action',
  Adventure = 'Adventure',
  Historical = 'Historical',
  Drama = 'Drama',
  Musical = 'Musical',
  Documentary = 'Documentary',
  SliceOfLife = 'Slice of Life',
  ActionComedy = 'Action-Comedy',
  Superhero = 'Superhero',
  Family = 'Family',
  ComingOfAge = 'Coming-of-Age',
  Noir = 'Noir',
  Western = 'Western',
  Satire = 'Satire',
}

enum Transitions {
  CutTo = 'CUT TO:',
  FadeIn = 'FADE IN:',
  FadeOut = 'FADE OUT:',
  DissolveTo = 'DISSOLVE TO:',
  SmashCutTo = 'SMASH CUT TO:',
  MatchCutTo = 'MATCH CUT TO:',
  JumpCutTo = 'JUMP CUT TO:',
  WipeTo = 'WIPE TO:',
  IrisIn = 'IRIS IN:',
  IrisOut = 'IRIS OUT:',
  WhipPanTo = 'WHIP PAN TO:',
  CrossfadeTo = 'CROSSFADE TO:',
  MontageSequence = 'MONTAGE SEQUENCE:',
  IntercutWith = 'INTERCUT WITH:',
  FreezeFrame = 'FREEZE FRAME:',
  Superimpose = 'SUPERIMPOSE:',
}

enum STATUS {
  Draft = 'Draft',
  Publish = 'Published',
}

export interface IScript {
  _id?: mongoose.Types.ObjectId
  title: string
  description: string
  imageUrl: string
  hoverGif: string
  genre: Genres
  script: {
    heading: string
    action: string
    dialogues: {
      character: string
      parenthetical?: string
      line: string
    }[]
    transition?: Transitions
  }[]
  status: STATUS
}

const scriptsSchema = new Schema<IScript>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true, trim: true },
    hoverGif: { type: String, required: true, trim: true },
    genre: { type: String, enum: Object.values(Genres), required: true },
    script: [
      {
        heading: { type: String, required: true, trim: true },
        action: { type: String, required: true, trim: true },
        dialogues: [
          {
            character: { type: String, required: true, trim: true },
            parenthetical: { type: String, trim: true },
            line: { type: String, required: true, trim: true },
          },
        ],
        transition: {
          type: String,
          enum: Object.values(Transitions),
          required: false,
        },
      },
    ],
    status: {
      type: String,
      enum: Object.values(STATUS),
      required: true,
      default: Object.values(STATUS)[0],
    },
  },
  { timestamps: true }
)

const Scripts = models.Scripts || model<IScript>('Scripts', scriptsSchema)

export default Scripts
