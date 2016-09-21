import Ember from 'ember';

export function marvelImagePath([imageObject]) {
  return imageObject.path +"."+ imageObject.extension;
}

export default Ember.Helper.helper(marvelImagePath);
