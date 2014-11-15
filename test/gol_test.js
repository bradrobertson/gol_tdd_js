function Cell(state){

  this._alive = state == true;

  this.isAlive = function(){
    return this._alive;
  }

  this.willBeAlive = function(neighbours){
    var liveCount = neighbours.reduce(function(count, neighbour){
      if (neighbour.isAlive()) count += 1

      return count;
    }, 0);

    return this.isAlive() && liveCount == 2 || liveCount == 3;
  }
}

describe("SOme Cell", function(){
  it("works", function(){
    var cell = new Cell();

    expect(cell.constructor).to.eq(Cell);
  });

  it('defaults to dead', function () {
    var cell = new Cell();

    expect(cell.isAlive()).to.eq(false);
  });

  it('allows state to be set on construction', function () {
    var cell = new Cell(true);

    expect(cell.isAlive()).to.eq(true);
  });

  it('dies of starvation if > 3 live neighbours', function () {
    var cell = new Cell(),
        neighbours = [new Cell(true), new Cell(true), new Cell(true), new Cell(true)];

    expect(cell.willBeAlive(neighbours)).to.eq(false);
  });

  it('dies of underpopulation if < 2 live neighbours', function () {
    var cell = new Cell(),
        neighbours = [new Cell(true)];

    expect(cell.willBeAlive(neighbours)).to.eq(false);
  });

  it('lives if live neighbours == 3', function () {
    var cell = new Cell(),
        neighbours = [new Cell(true), new Cell(true), new Cell(true)];

    expect(cell.willBeAlive(neighbours)).to.eq(true);
  });

  it('lives if live neighbours == 2 and is already alive', function () {
    var cell = new Cell(true),
        neighbours = [new Cell(true), new Cell(true)];

    expect(cell.willBeAlive(neighbours)).to.eq(true);
  });

  it('dies if live neighbours == 2 and is already dead', function () {
    var cell = new Cell(),
        neighbours = [new Cell(true), new Cell(true)];

    expect(cell.willBeAlive(neighbours)).to.eq(false);
  });
});
