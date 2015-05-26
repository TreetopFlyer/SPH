/*Before body tag*/

var Realm = {};
Realm.Config = {};
Realm.Config.CellSize = 100;
Realm.Instances = [];
Realm.Active = {};
Realm.Create = function(inWidth, inHeight)
{
	var obj = {};
	
	obj.Cells = [];
	obj.Cell = [];
	
	var x, y;
	var row;
	var cell;
	for(x=0; x<inWidth; x++)
	{
		row = [];
		obj.Cell.push(row);
		
		for(y=0; y<inHeight; y++)
		{
			cell = Cell.Create(x*Realm.Config.CellSize, y*Realm.Config.CellSize, Realm.Config.CellSize, Realm.Config.CellSize);
			row.push(cell);
			obj.Cells.push(cell);
		};
	};
	
	obj.Selection = [];
	
	Realm.Instances.push(obj);
	Realm.Active = obj;
	return obj;
};

var Cell = {};
Cell.Config = {};
Cell.Instances = [];
Cell.Active = {};
Cell.Create = function(inX, inY, inW, inH)
{
	var obj = {};
	
	obj.Members = [];
	obj.X = inX;
	obj.Y = inY;
	obj.Height = inH;
	obj.Width = inW;
	
	Cell.Instances.push(obj);
	Cell.Active = obj;
	return obj;
};

/*

1/(1+e^-x)


1/(1+e^(-x/10))*(1 - (1/(1+e^(-x/10))))

s*(1-s)

*/

var Particle = {};
Particle.Instances = [];
Particle.Update = function()
{
	var i;
	var current;
	for(i=0; i<Particle.Instances.length; i++)
	{
		current = Particle.Instances[i];
		
		Particle.SampleAcc(current);
		
		current.Vel.X += current.Acc.X;
		current.Vel.Y += current.Acc.Y;
		
		current.Pos.X += current.Vel.X;
		current.Pos.Y += current.Vel.Y;
		
		current.Display.css({left:current.Pos.X+"px", top:current.Pos.Y+"px"});
	}
};
Particle.SampleAcc = function(inP)
{
	var i;
	var current;
	var gap = {};
	var distance;
	
	var radius = 10;
	var sig, sigDeriv;
	var reducer = 1;
	inP.Acc = {X:0, Y:0};
	for(i=0; i<Particle.Instances.length; i++)
	{
		gap.X = inP.Pos.X - current.Pos.X;
		gap.Y = inP.Pos.Y - current.Pos.Y;
		distance = Math.sqrt(gap.X*gap.X + gap.Y*gap.Y);
		
		sig = 1/(1+Math.pow(e, -distance/radius));
		sigDeriv = sig*(1 - sig)*4;
		
		inP.Acc.X += gap.X*sigDeriv*reducer;
		inP.Acc.Y += gap.Y*sigDeriv*reducer;
	}
};
Particle.Create = function(inX, inY)
{
	var obj = {};
	obj.Pos = {X:inX, Y:inY};
	obj.Vel = {X:0, Y:0};
	obj.Acc = {X:0, Y:0};
	
	obj.Display = $("<div class=\"Particle\"></div>");
	$("body").append(obj.display);
	
	Particle.Instances.push(obj);
	return obj;
};
Particle.Fill = function(inWidth, inHeight, inCount)
{
	for(i=0; i<inCount; i++)
	{
		Particle.Create(Math.random()*inWidth, Math.random()*inHeight);
	}
};
