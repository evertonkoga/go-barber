import IStorageProvider from "../models/IStorageProvider";

class FakeStorageProvider implements IStorageProvider {
  private storages: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storages.push(file);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.storages.findIndex(findFile => findFile === file);

    this.storages.slice(findIndex, 1);
  }
}

export default FakeStorageProvider;
