/* eslint-disable
    no-undef,
*/
const solutionsByLanguage = { javascript: {}, lua: {}, python: {}, coffeescript: {}, java: {}, cpp: {} }
solutionsByLanguage.javascript.dungeonsOfKithgard = `\
// Move towards the gem.
// Don’t touch the spikes!
// Type your code below and click Run when you’re done.

hero.moveRight();
hero.moveDown();
hero.moveRight();\
`
solutionsByLanguage.javascript.peekABoom = `\
// Build traps on the path when the hero sees a munchkin!

while(true) {
    var enemy = hero.findNearestEnemy();
    if(enemy) {
        // Build a "fire-trap" at the Red X (41, 24)
        hero.buildXY("fire-trap", 41, 24);
    }
    // Add an else below to move back to the clearing
    else {
        // Move to the Wooden X (19, 19)
        hero.moveXY(19, 19);
    }
}\
`
solutionsByLanguage.javascript.woodlandCleaver = `\
// Use your new "cleave" skill as often as you can.

hero.moveXY(23, 23);
while(true) {
    var enemy = hero.findNearestEnemy();
    if(hero.isReady("cleave")) {
        // Cleave the enemy!
        hero.cleave(enemy);
    } else {
        // Else (if cleave isn't ready), do your normal attack.
        hero.attack(enemy);
    }
}\
`
solutionsByLanguage.javascript.aFineMint = `\
// Peons are trying to steal your coins!
// Write a function to squash them before they can take your coins.

function pickUpCoin() {
    var coin = hero.findNearestItem();
    if(coin) {
        hero.moveXY(coin.pos.x, coin.pos.y);
    }
}

// Write the attackEnemy function below.
// Find the nearest enemy and attack them if they exist!
function attackEnemy() {
    var enemy = hero.findNearestEnemy();
    if(enemy) {
        hero.attack(enemy);
    }
}

while(true) {
    attackEnemy(); // Δ Uncomment this line after you write an attackEnemy function.
    pickUpCoin();
}\
`
solutionsByLanguage.javascript.libraryTactician = `\
// Hushbaum has been ambushed by ogres!
// She is busy healing her soldiers, you should command them to fight!
// The ogres will send more troops if they think they can get to Hushbaum or your archers, so keep them inside the circle!

var archerTarget = null;
// Soldiers spread out in a circle and defend.
function commandSoldier(soldier, soldierIndex, numSoldiers) {
    var angle = Math.PI * 2 * soldierIndex / numSoldiers;
    var defendPos = {x: 41, y: 40};
    defendPos.x += 10 * Math.cos(angle);
    defendPos.y += 10 * Math.sin(angle);
    hero.command(soldier, "defend", defendPos);
}

// Find the strongest target (most health)
// This function returns something! When you call the function, you will get some value back.
function findStrongestTarget() {
    var mostHealth = 0;
    var bestTarget = null;
    var enemies = hero.findEnemies();
    // Figure out which enemy has the most health, and set bestTarget to be that enemy.
    for(var i=0; i < enemies.length; i++) {
        var enemy = enemies[i];
        if(enemy.health > mostHealth) {
            bestTarget = enemy;
            mostHealth = enemy.health;
        }
    }
    // Only focus archers' fire if there is a big ogre.
    if (bestTarget && bestTarget.health > 15) {
        return bestTarget;
    } else {
        return null;
    }
}


// If the strongestTarget has more than 15 health, attack that target. Otherwise, attack the nearest target.
function commandArcher(archer) {
    var nearest = archer.findNearestEnemy();
    if(archerTarget) {
        hero.command(archer, "attack", archerTarget);
    } else if(nearest) {
        hero.command(archer, "attack", nearest);
    }
}


while(true) {
    // If archerTarget is defeated or doesn't exist, find a new one.
    if(!archerTarget || archerTarget.health <= 0) {
        // Set archerTarget to be the target that is returned by findStrongestTarget()
        archerTarget = findStrongestTarget();
    }
    var soldiers = hero.findByType("soldier");
    // Create a variable containing your archers.
    var archers = hero.findByType("archer");
    for(var i=0; i < soldiers.length; i++) {
        var soldier = soldiers[i];
        commandSoldier(soldier, i, soldiers.length);
    }
    // use commandArcher() to command your archers
    for(i=0; i < archers.length; i++) {
        var archer = archers[i];
        commandArcher(archer);
    }
}\
`
solutionsByLanguage.javascript.snowdrops = `\
// We need to clear the forest of traps!
// The scout prepared a map of the forest.
// But be careful where you shoot! Don't start a fire.

// Get the map of the forest.
var forestMap = hero.findNearest(hero.findFriends()).forestMap;

// The map is a 2D array where 0 is a trap.
// The first sure shot.
hero.say("Row " + 0 + " Column " + 1 + " Fire!");

// But for the next points, check before shooting.
// There are an array of points to check.
var cells = [{row: 0, col: 4}, {row: 1, col: 0}, {row: 1, col: 2}, {row: 1, col: 4},
    {row: 2, col: 1}, {row: 2, col: 3}, {row: 2, col: 5}, {row: 3, col: 0},
    {row: 3, col: 2}, {row: 3, col: 4}, {row: 4, col: 1}, {row: 4, col: 2},
    {row: 4, col: 3}, {row: 5, col: 0}, {row: 5, col: 3}, {row: 5, col: 5},
    {row: 6, col: 1}, {row: 6, col: 3}, {row: 6, col: 4}, {row: 7, col: 0}];

for (var i = 0; i < cells.length; i++) {
    var row = cells[i].row;
    var col = cells[i].col;
    // If row is less than forestMap length:
    if (row < forestMap.length) {
        // If col is less than forestMap[row] length:
        if (col < forestMap[row].length) {
            // Now, we know the cell exists.
            // If it is 0, say where to shoot:
            if (forestMap[row][col] === 0) {
                hero.say("Row " + row + " Column " + col + " Fire!");
            }
        }
    }
}\
`

solutionsByLanguage.lua.dungeonsOfKithgard = `\
-- Move towards the gem.
-- Don’t touch the spikes!
-- Type your code below and click Run when you’re done.

hero:moveRight()
hero:moveDown()
hero:moveRight()\
`
solutionsByLanguage.lua.peekABoom = `\
-- Build traps on the path when the hero sees a munchkin!

while true do
    local enemy = hero:findNearestEnemy()
    if enemy then
        -- Build a "fire-trap" at the Red X (41, 24)
        hero:buildXY("fire-trap", 41, 24)
    -- Add an else below to move back to the clearing
    else
        -- Move to the Wooden X (19, 19)
        hero:moveXY(19, 19)
    end
end\
`
solutionsByLanguage.lua.woodlandCleaver = `\
-- Use your new "cleave" skill as often as you can.

hero:moveXY(23, 23)
while true do
    local enemy = hero:findNearestEnemy()
    if hero:isReady("cleave") then
        -- Cleave the enemy!
        hero:cleave(enemy)
    else
        -- Else (if cleave isn't ready), do your normal attack.
        hero:attack(enemy)
    end
end\
`
solutionsByLanguage.lua.aFineMint = `\
-- Peons are trying to steal your coins!
-- Write a function to squash them before they can take your coins.

function pickUpCoin()
    local coin = hero:findNearestItem()
    if coin then
        hero:moveXY(coin.pos.x, coin.pos.y)
    end
end

-- Write the attackEnemy function below.
-- Find the nearest enemy and attack them if they exist!
function attackEnemy()
    local enemy = hero:findNearestEnemy()
    if enemy then
        hero:attack(enemy)
    end
end

while true do
    attackEnemy() -- Δ Uncomment this line after you write an attackEnemy function.
    pickUpCoin()
end\
`
solutionsByLanguage.lua.libraryTactician = `\
-- Hushbaum has been ambushed by ogres!
-- She is busy healing her soldiers, you should command them to fight!
-- The ogres will send more troops if they think they can get to Hushbaum or your archers, so keep them inside the circle!

local archerTarget = nil
-- Soldiers spread out in a circle and defend.
function commandSoldier(soldier, soldierIndex, numSoldiers)
    local angle = Math.PI * 2 * soldierIndex / numSoldiers
    local defendPos = {x=41, y=40}
    defendPos.x = defendPos.x + 10 * Math.cos(angle)
    defendPos.y = defendPos.y + 10 * Math.sin(angle)
    hero:command(soldier, "defend", defendPos)
end

-- Find the strongest target (most health)
-- This function returns something! When you call the function, you will get some value back.
function findStrongestTarget()
    local mostHealth = 0
    local bestTarget = nil
    local enemies = hero:findEnemies()
    -- Figure out which enemy has the most health, and set bestTarget to be that enemy.
    for i, enemy in pairs(enemies) do
        if enemy.health > mostHealth then
            bestTarget = enemy
            mostHealth = enemy.health
        end
    end
    -- Only focus archers' fire if there is a big ogre.
    if bestTarget and bestTarget.health > 15 then
        return bestTarget
    else
        return nil
    end
end


-- If the strongestTarget has more than 15 health, attack that target. Otherwise, attack the nearest target.
function commandArcher(archer)
    local nearest = archer:findNearestEnemy()
    if archerTarget then
        hero:command(archer, "attack", archerTarget)
    elseif nearest then
        hero:command(archer, "attack", nearest)
    end
end


while true do
    -- If archerTarget is defeated or doesn't exist, find a new one.
    if not archerTarget or archerTarget.health <= 0 then
        -- Set archerTarget to be the target that is returned by findStrongestTarget()
        archerTarget = findStrongestTarget()
    end
    local soldiers = hero:findByType("soldier")
    -- Create a variable containing your archers.
    local archers = hero:findByType("archer")
    for i, soldier in pairs(soldiers) do
        commandSoldier(soldier, i, #soldiers)
    end
    -- use commandArcher() to command your archers
    for i, archer in pairs(archers) do
        commandArcher(archer)
    end
end\
`
solutionsByLanguage.lua.snowdrops = `\
-- We need to clear the forest of traps!
-- The scout prepared a map of the forest.
-- But be careful where you shoot! Don't start a fire.

-- Get the map of the forest.
local forestMap = hero:findNearest(hero:findFriends()).forestMap

-- The map is a 2D array where 0 is a trap.
-- The first sure shot.
hero:say("Row " + 0 + " Column " + 1 + " Fire!")

-- But for the next points, check before shooting.
-- There are an array of points to check.
local cells = {{row=0, col=4}, {row=1, col=0}, {row=1, col=2}, {row=1, col=4},
    {row=2, col=1}, {row=2, col=3}, {row=2, col=5}, {row=3, col=0},
    {row=3, col=2}, {row=3, col=4}, {row=4, col=1}, {row=4, col=2},
    {row=4, col=3}, {row=5, col=0}, {row=5, col=3}, {row=5, col=5},
    {row=6, col=1}, {row=6, col=3}, {row=6, col=4}, {row=7, col=0}}

for i in pairs(cells) do
    local row = cells[i].row
    local col = cells[i].col
    -- If row is less than forestMap length:
    if row < #forestMap then
        -- If col is less than forestMap[row] length:
        if col < #forestMap[row + 1] then
            -- Now, we know the cell exists.
            -- If it is 0, say where to shoot:
            if forestMap[row + 1][col + 1] == 0 then
                hero:say("Row " + row + " Column " + col + " Fire!")
            end
        end
    end
end\
`

solutionsByLanguage.python.dungeonsOfKithgard = `\
# Move towards the gem.
# Don’t touch the spikes!
# Type your code below and click Run when you’re done.

hero.moveRight()
hero.moveDown()
hero.moveRight()\
`
solutionsByLanguage.python.peekABoom = `\
# Build traps on the path when the hero sees a munchkin!

while True:
    enemy = hero.findNearestEnemy()
    if enemy:
        # Build a "fire-trap" at the Red X (41, 24)
        hero.buildXY("fire-trap", 41, 24)
    # Add an else below to move back to the clearing
    else:
        # Move to the Wooden X (19, 19)
        hero.moveXY(19, 19)\
`
solutionsByLanguage.python.woodlandCleaver = `\
# Use your new "cleave" skill as often as you can.

hero.moveXY(23, 23)
while True:
    enemy = hero.findNearestEnemy()
    if hero.isReady("cleave"):
        # Cleave the enemy!
        hero.cleave(enemy)
    else:
        # Else (if cleave isn't ready), do your normal attack.
        hero.attack(enemy)\
`
solutionsByLanguage.python.aFineMint = `\
# Peons are trying to steal your coins!
# Write a function to squash them before they can take your coins.

def pickUpCoin():
    coin = hero.findNearestItem()
    if coin:
        hero.moveXY(coin.pos.x, coin.pos.y)

# Write the attackEnemy function below.
# Find the nearest enemy and attack them if they exist!
def attackEnemy():
    enemy = hero.findNearestEnemy()
    if enemy:
        hero.attack(enemy)

while True:
    attackEnemy() # Δ Uncomment this line after you write an attackEnemy function.
    pickUpCoin()\
`
solutionsByLanguage.python.libraryTactician = `\
# Hushbaum has been ambushed by ogres!
# She is busy healing her soldiers, you should command them to fight!
# The ogres will send more troops if they think they can get to Hushbaum or your archers, so keep them inside the circle!

archerTarget = None
# Soldiers spread out in a circle and defend.
def commandSoldier(soldier, soldierIndex, numSoldiers):
    angle = Math.PI * 2 * soldierIndex / numSoldiers
    defendPos = {"x": 41, "y": 40}
    defendPos.x += 10 * Math.cos(angle)
    defendPos.y += 10 * Math.sin(angle)
    hero.command(soldier, "defend", defendPos)

# Find the strongest target (most health)
# This function returns something! When you call the function, you will get some value back.
def findStrongestTarget():
    mostHealth = 0
    bestTarget = None
    enemies = hero.findEnemies()
    # Figure out which enemy has the most health, and set bestTarget to be that enemy.
    for i in range(len(enemies)):
        enemy = enemies[i]
        if enemy.health > mostHealth:
            bestTarget = enemy
            mostHealth = enemy.health
    # Only focus archers' fire if there is a big ogre.
    if bestTarget and bestTarget.health > 15:
        return bestTarget
    else:
        return None


# If the strongestTarget has more than 15 health, attack that target. Otherwise, attack the nearest target.
def commandArcher(archer):
    nearest = archer.findNearestEnemy()
    if archerTarget:
        hero.command(archer, "attack", archerTarget)
    elif nearest:
        hero.command(archer, "attack", nearest)


while True:
    # If archerTarget is defeated or doesn't exist, find a new one.
    if not archerTarget or archerTarget.health <= 0:
        # Set archerTarget to be the target that is returned by findStrongestTarget()
        archerTarget = findStrongestTarget()
    soldiers = hero.findByType("soldier")
    # Create a variable containing your archers.
    archers = hero.findByType("archer")
    for i in range(len(soldiers)):
        soldier = soldiers[i]
        commandSoldier(soldier, i, len(soldiers))
    # use commandArcher() to command your archers
    for i in range(len(archers)):
        archer = archers[i]
        commandArcher(archer)\
`
solutionsByLanguage.python.snowdrops = `\
# We need to clear the forest of traps!
# The scout prepared a map of the forest.
# But be careful where you shoot! Don't start a fire.

# Get the map of the forest.
forestMap = hero.findNearest(hero.findFriends()).forestMap

# The map is a 2D array where 0 is a trap.
# The first sure shot.
hero.say("Row " + 0 + " Column " + 1 + " Fire!")

# But for the next points, check before shooting.
# There are an array of points to check.
cells = [{"row": 0, "col": 4}, {"row": 1, "col": 0}, {"row": 1, "col": 2}, {"row": 1, "col": 4},
    {"row": 2, "col": 1}, {"row": 2, "col": 3}, {"row": 2, "col": 5}, {"row": 3, "col": 0},
    {"row": 3, "col": 2}, {"row": 3, "col": 4}, {"row": 4, "col": 1}, {"row": 4, "col": 2},
    {"row": 4, "col": 3}, {"row": 5, "col": 0}, {"row": 5, "col": 3}, {"row": 5, "col": 5},
    {"row": 6, "col": 1}, {"row": 6, "col": 3}, {"row": 6, "col": 4}, {"row": 7, "col": 0}]

for i in range(len(cells)):
    row = cells[i].row
    col = cells[i].col
    # If row is less than forestMap length:
    if row < len(forestMap):
        # If col is less than forestMap[row] length:
        if col < len(forestMap[row]):
            # Now, we know the cell exists.
            # If it is 0, say where to shoot:
            if forestMap[row][col] == 0:
                hero.say("Row " + row + " Column " + col + " Fire!")\
`

solutionsByLanguage.coffeescript.dungeonsOfKithgard = `\
# Move towards the gem.
# Don’t touch the spikes!
# Type your code below and click Run when you’re done.

hero.moveRight()
hero.moveDown()
hero.moveRight()\
`
solutionsByLanguage.coffeescript.peekABoom = `\
# Build traps on the path when the hero sees a munchkin!

loop
    enemy = hero.findNearestEnemy()
    if enemy
        # Build a "fire-trap" at the Red X (41, 24)
        hero.buildXY "fire-trap", 41, 24
    # Add an else below to move back to the clearing
    else
        # Move to the Wooden X (19, 19)
        hero.moveXY 19, 19\
`
solutionsByLanguage.coffeescript.woodlandCleaver = `\
# Use your new "cleave" skill as often as you can.

hero.moveXY 23, 23
loop
    enemy = hero.findNearestEnemy()
    if hero.isReady "cleave"
        # Cleave the enemy!
        hero.cleave enemy
    else
        # Else (if cleave isn't ready), do your normal attack.
        hero.attack enemy\
`
solutionsByLanguage.coffeescript.aFineMint = `\
# Peons are trying to steal your coins!
# Write a function to squash them before they can take your coins.

pickUpCoin = ->
    coin = hero.findNearestItem()
    if coin
        hero.moveXY coin.pos.x, coin.pos.y

# Write the attackEnemy function below.
# Find the nearest enemy and attack them if they exist!
attackEnemy = ->
    enemy = hero.findNearestEnemy()
    if enemy
        hero.attack enemy

loop
    attackEnemy() # Δ Uncomment this line after you write an attackEnemy function.
    pickUpCoin()\
`
solutionsByLanguage.coffeescript.libraryTactician = `\
# Hushbaum has been ambushed by ogres!
# She is busy healing her soldiers, you should command them to fight!
# The ogres will send more troops if they think they can get to Hushbaum or your archers, so keep them inside the circle!

archerTarget = null
# Soldiers spread out in a circle and defend.
commandSoldier = (soldier, soldierIndex, numSoldiers) ->
    angle = Math.PI * 2 * soldierIndex / numSoldiers
    defendPos = {x: 41, y: 40}
    defendPos.x += 10 * Math.cos angle
    defendPos.y += 10 * Math.sin angle
    hero.command soldier, "defend", defendPos

# Find the strongest target (most health)
# This function returns something! When you call the function, you will get some value back.
findStrongestTarget = ->
    mostHealth = 0
    bestTarget = null
    enemies = hero.findEnemies()
    # Figure out which enemy has the most health, and set bestTarget to be that enemy.
    for enemy, i in enemies
        if enemy.health > mostHealth
            bestTarget = enemy
            mostHealth = enemy.health
    # Only focus archers' fire if there is a big ogre.
    if bestTarget and bestTarget.health > 15
        return bestTarget
    else
        return null


# If the strongestTarget has more than 15 health, attack that target. Otherwise, attack the nearest target.
commandArcher = (archer) ->
    nearest = archer.findNearestEnemy()
    if archerTarget
        hero.command archer, "attack", archerTarget
    else if nearest
        hero.command archer, "attack", nearest


loop
    # If archerTarget is defeated or doesn't exist, find a new one.
    if not archerTarget or archerTarget.health <= 0
        # Set archerTarget to be the target that is returned by findStrongestTarget()
        archerTarget = findStrongestTarget()
    soldiers = hero.findByType "soldier"
    # Create a variable containing your archers.
    archers = hero.findByType "archer"
    for soldier, i in soldiers
        commandSoldier soldier, i, soldiers.length
    # use commandArcher() to command your archers
    for archer, i in archers
        commandArcher archer\
`
solutionsByLanguage.coffeescript.snowdrops = `\
# We need to clear the forest of traps!
# The scout prepared a map of the forest.
# But be careful where you shoot! Don't start a fire.

# Get the map of the forest.
forestMap = hero.findNearest(hero.findFriends()).forestMap

# The map is a 2D array where 0 is a trap.
# The first sure shot.
hero.say "Row " + 0 + " Column " + 1 + " Fire!"

# But for the next points, check before shooting.
# There are an array of points to check.
cells = [{row: 0, col: 4}, {row: 1, col: 0}, {row: 1, col: 2}, {row: 1, col: 4},
    {row: 2, col: 1}, {row: 2, col: 3}, {row: 2, col: 5}, {row: 3, col: 0},
    {row: 3, col: 2}, {row: 3, col: 4}, {row: 4, col: 1}, {row: 4, col: 2},
    {row: 4, col: 3}, {row: 5, col: 0}, {row: 5, col: 3}, {row: 5, col: 5},
    {row: 6, col: 1}, {row: 6, col: 3}, {row: 6, col: 4}, {row: 7, col: 0}]

for i in [0...cells.length]
    row = cells[i].row
    col = cells[i].col
    # If row is less than forestMap length:
    if row < forestMap.length
        # If col is less than forestMap[row] length:
        if col < forestMap[row].length
            # Now, we know the cell exists.
            # If it is 0, say where to shoot:
            if forestMap[row][col] is 0
                hero.say "Row " + row + " Column " + col + " Fire!"\
`

solutionsByLanguage.java.dungeonsOfKithgard = `\
// Move towards the gem.
// Don’t touch the spikes!
// Type your code below and click Run when you’re done.

public class AI {
    public static void main(String[] args) {
        hero.moveRight();
        hero.moveDown();
        hero.moveRight();
    }
}\
`
solutionsByLanguage.java.peekABoom = `\
// Build traps on the path when the hero sees a munchkin!

public class AI {
    public static void main(String[] args) {
        while(true) {
            var enemy = hero.findNearestEnemy();
            if(enemy) {
                // Build a "fire-trap" at the Red X (41, 24)
                hero.buildXY("fire-trap", 41, 24);
            }
            // Add an else below to move back to the clearing
            else {
                // Move to the Wooden X (19, 19)
                hero.moveXY(19, 19);
            }
        }
    }
}\
`
solutionsByLanguage.java.woodlandCleaver = `\
// Use your new "cleave" skill as often as you can.

public class AI {
    public static void main(String[] args) {
        hero.moveXY(23, 23);
        while(true) {
            var enemy = hero.findNearestEnemy();
            if(hero.isReady("cleave")) {
                // Cleave the enemy!
                hero.cleave(enemy);
            } else {
                // Else (if cleave isn't ready), do your normal attack.
                hero.attack(enemy);
            }
        }
    }
}\
`
solutionsByLanguage.java.aFineMint = `\
// Peons are trying to steal your coins!
// Write a function to squash them before they can take your coins.

public class AI {
    public static void pickUpCoin() {
        var coin = hero.findNearestItem();
        if(coin) {
            hero.moveXY(coin.pos.x, coin.pos.y);
        }
    }

    // Write the attackEnemy function below.
    // Find the nearest enemy and attack them if they exist!
    public static void attackEnemy() {
        var enemy = hero.findNearestEnemy();
        if(enemy) {
            hero.attack(enemy);
        }
    }

    public static void main(String[] args) {
        while(true) {
            attackEnemy(); // Δ Uncomment this line after you write an attackEnemy function.
            pickUpCoin();
        }
    }
}\
`
solutionsByLanguage.java.libraryTactician = `\
// Hushbaum has been ambushed by ogres!
// She is busy healing her soldiers, you should command them to fight!
// The ogres will send more troops if they think they can get to Hushbaum or your archers, so keep them inside the circle!

public class AI {
    var archerTarget = null;
    // Soldiers spread out in a circle and defend.

    public static void commandSoldier(Object soldier, Object soldierIndex, Object numSoldiers) {
        var angle = Math.PI * 2 * soldierIndex / numSoldiers;
        var defendPos = {41, 40};
        defendPos.x += 10 * Math.cos(angle);
        defendPos.y += 10 * Math.sin(angle);
        hero.command(soldier, "defend", defendPos);
    }

    public static Object findStrongestTarget() {
        var mostHealth = 0;
        var bestTarget = null;
        var enemies = hero.findEnemies();
        // Figure out which enemy has the most health, and set bestTarget to be that enemy.
        for(int i=0; i < enemies.length; i++) {
            var enemy = enemies[i];
            if(enemy.health > mostHealth) {
                bestTarget = enemy;
                mostHealth = enemy.health;
            }
        }
        // Only focus archers' fire if there is a big ogre.
        if (bestTarget && bestTarget.health > 15) {
            return bestTarget;
        } else {
            return null;
        }
    }

    public static void commandArcher(Object archer) {
        var nearest = archer.findNearestEnemy();
        if(archerTarget) {
            hero.command(archer, "attack", archerTarget);
        } else if(nearest) {
            hero.command(archer, "attack", nearest);
        }
    }

    public static void main(String[] args) {
        while(true) {
            // If archerTarget is defeated or doesn't exist, find a new one.
            if(!archerTarget || archerTarget.health <= 0) {
                // Set archerTarget to be the target that is returned by findStrongestTarget()
                archerTarget = findStrongestTarget();
            }
            var soldiers = hero.findByType("soldier");
            // Create a variable containing your archers.
            var archers = hero.findByType("archer");
            for(int i=0; i < soldiers.length; i++) {
                var soldier = soldiers[i];
                commandSoldier(soldier, i, soldiers.length);
            }
            // use commandArcher() to command your archers
            for(i=0; i < archers.length; i++) {
                var archer = archers[i];
                commandArcher(archer);
            }
        }
    }
}\
`
solutionsByLanguage.java.snowdrops = `\
int main() {
    // We need to clear the forest of traps!
    // The scout prepared a map of the forest.
    // But be careful where you shoot! Don't start a fire.

    // Get the map of the forest.
    auto forestMap = hero.findNearest(hero.findFriends()).forestMap;

    // The map is a 2D array where 0 is a trap.
    // The first sure shot.
    hero.say("Row " + 0 + " Column " + 1 + " Fire!");

    // But for the next points, check before shooting.
    // There are an array of points to check.
    auto cells = {{0, 4}, {1, 0}, {1, 2}, {1, 4},
        {2, 1}, {2, 3}, {2, 5}, {3, 0},
        {3, 2}, {3, 4}, {4, 1}, {4, 2},
        {4, 3}, {5, 0}, {5, 3}, {5, 5},
        {6, 1}, {6, 3}, {6, 4}, {7, 0}};

    for (int i = 0; i < cells.size(); i++) {
        auto row = cells[i].x;
        auto col = cells[i].y;
        // If row is less than forestMap length:
        if (row < forestMap.length) {
            // If col is less than forestMap[row] length:
            if (col < forestMap[row].size()) {
                // Now, we know the cell exists.
                // If it is 0, say where to shoot:
                if (forestMap[row][col] == 0) {
                    hero.say("Row " + row + " Column " + col + " Fire!");
                }
            }
        }
    }
    return 0;
}\
`

solutionsByLanguage.cpp.dungeonsOfKithgard = `\
// Move towards the gem.
// Don’t touch the spikes!
// Type your code below and click Run when you’re done.

int main() {
    hero.moveRight();
    hero.moveDown();
    hero.moveRight();
    return 0;
}\
`
solutionsByLanguage.cpp.peekABoom = `\
// Build traps on the path when the hero sees a munchkin!

int main() {
    while(true) {
        auto enemy = hero.findNearestEnemy();
        if(enemy) {
            // Build a "fire-trap" at the Red X (41, 24)
            hero.buildXY("fire-trap", 41, 24);
        }
        // Add an else below to move back to the clearing
        else {
            // Move to the Wooden X (19, 19)
            hero.moveXY(19, 19);
        }
    }
    return 0;
}\
`
solutionsByLanguage.cpp.woodlandCleaver = `\
// Use your new "cleave" skill as often as you can.

int main() {
    hero.moveXY(23, 23);
    while(true) {
        auto enemy = hero.findNearestEnemy();
        if(hero.isReady("cleave")) {
            // Cleave the enemy!
            hero.cleave(enemy);
        } else {
            // Else (if cleave isn't ready), do your normal attack.
            hero.attack(enemy);
        }
    }
    return 0;
}\
`
solutionsByLanguage.cpp.aFineMint = `\
// Peons are trying to steal your coins!
// Write a function to squash them before they can take your coins.

auto pickUpCoin() {
    auto coin = hero.findNearestItem();
    if(coin) {
        hero.moveXY(coin.pos.x, coin.pos.y);
    }
}

// Write the attackEnemy function below.
// Find the nearest enemy and attack them if they exist!
auto attackEnemy() {
    auto enemy = hero.findNearestEnemy();
    if(enemy) {
        hero.attack(enemy);
    }
}

int main() {
    while(true) {
        attackEnemy(); // Δ Uncomment this line after you write an attackEnemy function.
        pickUpCoin();
    }
    return 0;
}\
`
solutionsByLanguage.cpp.libraryTactician = `\
// Hushbaum has been ambushed by ogres!
// She is busy healing her soldiers, you should command them to fight!
// The ogres will send more troops if they think they can get to Hushbaum or your archers, so keep them inside the circle!

// Soldiers spread out in a circle and defend.
auto commandSoldier(auto soldier, auto soldierIndex, auto numSoldiers) {
    auto angle = Math.PI * 2 * soldierIndex / numSoldiers;
    auto defendPos = {41, 40};
    defendPos.x += 10 * Math.cos(angle);
    defendPos.y += 10 * Math.sin(angle);
    hero.command(soldier, "defend", defendPos);
}

// Find the strongest target (most health)
// This function returns something! When you call the function, you will get some value back.
auto findStrongestTarget() {
    auto mostHealth = 0;
    auto bestTarget = null;
    auto enemies = hero.findEnemies();
    // Figure out which enemy has the most health, and set bestTarget to be that enemy.
    for(int i=0; i < enemies.size(); i++) {
        auto enemy = enemies[i];
        if(enemy.health > mostHealth) {
            bestTarget = enemy;
            mostHealth = enemy.health;
        }
    }
    // Only focus archers' fire if there is a big ogre.
    if (bestTarget && bestTarget.health > 15) {
        return bestTarget;
    } else {
        return null;
    }
}

// If the strongestTarget has more than 15 health, attack that target. Otherwise, attack the nearest target.
auto commandArcher(auto archer) {
    auto nearest = archer.findNearestEnemy();
    if(archerTarget) {
        hero.command(archer, "attack", archerTarget);
    } else if(nearest) {
        hero.command(archer, "attack", nearest);
    }
}


auto archerTarget = null;



int main() {
    while(true) {
        // If archerTarget is defeated or doesn't exist, find a new one.
        if(!archerTarget || archerTarget.health <= 0) {
            // Set archerTarget to be the target that is returned by findStrongestTarget()
            archerTarget = findStrongestTarget();
        }
        auto soldiers = hero.findByType("soldier");
        // Create a variable containing your archers.
        auto archers = hero.findByType("archer");
        for(int i=0; i < soldiers.size(); i++) {
            auto soldier = soldiers[i];
            commandSoldier(soldier, i, soldiers.size());
        }
        // use commandArcher() to command your archers
        for(i=0; i < archers.size(); i++) {
            auto archer = archers[i];
            commandArcher(archer);
        }
    }
    return 0;
}\
`
solutionsByLanguage.cpp.snowdrops = `\
// We need to clear the forest of traps!
// The scout prepared a map of the forest.
// But be careful where you shoot! Don't start a fire.

int main() {
    // Get the map of the forest.
    auto forestMap = hero.findNearest(hero.findFriends()).forestMap;

    // The map is a 2D array where 0 is a trap.
    // The first sure shot.
    hero.say("Row " + 0 + " Column " + 1 + " Fire!");

    // But for the next points, check before shooting.
    // There are an array of points to check.
    auto cells = {{0, 4}, {1, 0}, {1, 2}, {1, 4},
        {2, 1}, {2, 3}, {2, 5}, {3, 0},
        {3, 2}, {3, 4}, {4, 1}, {4, 2},
        {4, 3}, {5, 0}, {5, 3}, {5, 5},
        {6, 1}, {6, 3}, {6, 4}, {7, 0}};

    for (int i = 0; i < cells.size(); i++) {
        auto row = cells[i].x;
        auto col = cells[i].y;
        // If row is less than forestMap length:
        if (row < forestMap.size()) {
            // If col is less than forestMap[row] length:
            if (col < forestMap[row].size()) {
                // Now, we know the cell exists.
                // If it is 0, say where to shoot:
                if (forestMap[row][col] == 0) {
                    hero.say("Row " + row + " Column " + col + " Fire!");
                }
            }
        }
    }
    return 0;
}\
`

function levenshteinDistance (str1, str2) {
  const m = str1.length
  const n = str2.length
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0))

  for (let i = 0; i <= m; i++) {
    dp[i][0] = i
  }

  for (let j = 0; j <= n; j++) {
    dp[0][j] = j
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
      }
    }
  }

  return dp[m][n]
}

describe('Aether / code transpilation utility library', () => {
  const translateUtils = require('../../../app/lib/translate-utils')

  describe('translateJS(jsCode, "cpp", fullCode)', () => {
    describe('do not add int main if fullCode set false', () => {
      it('if there is no pattern needing translation', () =>
        expect(translateUtils.translateJS('hero.moveRight()', 'cpp', false)).toBe('hero.moveRight()'))

      it('if there is var x or var y', () =>
        expect(translateUtils.translateJS('var x = 2;\nvar y = 3', 'cpp', false)).toBe('float x = 2;\nfloat y = 3'))

      it('if there is ===/!==', () =>
        expect(translateUtils.translateJS('if (a === 2 && b !== 1)', 'cpp', false)).toBe('if (a == 2 && b != 1)'))

      it('if there is other var', () =>
        expect(translateUtils.translateJS('var enemy = hero...', 'cpp', false)).toBe('auto enemy = hero...'))

      it('if there is a function definition', () =>
        expect(translateUtils.translateJS('function a() {}\n', 'cpp', false)).toBe('auto a() {}\n'))
    })

    describe('add int main if fullCode set true', () => {
      it('if there is no code', () =>
        expect(translateUtils.translateJS(''), 'cpp').toBe('int main() {\n    \n    return 0;\n}'))

      it('if there is no pattern needing translation', () =>
        expect(translateUtils.translateJS('hero.moveRight();'), 'cpp').toBe('int main() {\n    hero.moveRight();\n    return 0;\n}'))

      it('if there is var x or var y', () =>
        expect(translateUtils.translateJS('var x = 2;\nvar y = 3;', 'cpp')).toBe('int main() {\n    float x = 2;\n    float y = 3;\n    return 0;\n}'))

      it('if there is ===/!==', () =>
        expect(translateUtils.translateJS('while (a === 2 && b !== 1) {}', 'cpp')).toBe('int main() {\n    while (a == 2 && b != 1) {}\n    return 0;\n}'))

      it('if there is other var', () =>
        expect(translateUtils.translateJS('var enemy = hero;', 'cpp')).toBe('int main() {\n    auto enemy = hero;\n    return 0;\n}'))

      it('if there is a function definition', () =>
        expect(translateUtils.translateJS('function a() {}\n', 'cpp')).toBe('auto a() {}\n\nint main() {\n    \n    return 0;\n}'))

      it('if there is a function definition with parameter', () =>
        expect(translateUtils.translateJS('function a(b) {}\n', 'cpp')).toBe('auto a(auto b) {}\n\nint main() {\n    \n    return 0;\n}'))

      it('if there is a function definition with parameters', () =>
        expect(translateUtils.translateJS('function a(b, c) {\n    var d = b + c;\n}\na();', 'cpp')).toBe('auto a(auto b, auto c) {\n    auto d = b + c;\n}\n\nint main() {\n    a();\n    return 0;\n}'))
    })

    describe('if there are start comments', () => {
      it('if there is no code', () =>
        expect(translateUtils.translateJS('//abc\n//def\n\n', 'cpp')).toBe('//abc\n//def\n\nint main() {\n    \n    return 0;\n}'))

      it('if there is code without function definition', () =>
        expect(translateUtils.translateJS('//abc\n\nhero.moveRight()', 'cpp')).toBe('//abc\n\nint main() {\n    hero.moveRight();\n    return 0;\n}'))

      it('if there is code with function definition', () =>
        expect(translateUtils.translateJS('//abc\n\nfunction a(b, c) {}\nhero.moveRight()', 'cpp')).toBe('//abc\n\nauto a(auto b, auto c) {}\n\nint main() {\n    hero.moveRight();\n    return 0;\n}'))
    })

    describe('if JS code does not use semicolons (automatic semicolon insertion)', () => {
      it('in a simple statement', () =>
        expect(translateUtils.translateJS('hero.moveRight()', 'cpp')).toBe('int main() {\n    hero.moveRight();\n    return 0;\n}'))

      it('in a complicated program', () =>
        expect(translateUtils.translateJS('function a(b, c) {\n    var d = b + c\n}\na()', 'cpp')).toBe('auto a(auto b, auto c) {\n    auto d = b + c;\n}\n\nint main() {\n    a();\n    return 0;\n}'))

      it('if there is an empty function definition', () =>
        expect(translateUtils.translateJS('function a() {}\n', 'cpp')).toBe('auto a() {}\n\nint main() {\n    \n    return 0;\n}'))

      it('within indented comments', () =>
        expect(translateUtils.translateJS('function a() {\n    // Attack them\n    hero.attack()\n}\n', 'cpp')).toBe('auto a() {\n    // Attack them\n    hero.attack();\n}\n\nint main() {\n    \n    return 0;\n}'))
    })
  })

  describe('when translating JS argument placeholders', () => {
    describe('to Python', () => {
      it('handles quotes in Python dictionaries', () =>
        expect(translateUtils.translateJS('{x:1, y:1}', 'python', false)).toBe('{"x": 1, "y": 1}'))

      it('handles equals in Lua tables', () =>
        expect(translateUtils.translateJS('{x:1, y:1}', 'lua', false)).toBe('{x=1, y=1}'))

      it('handles autocomplete placeholders in Python', () =>
        expect(translateUtils.translateJS('hit(\'$' + '{1:up}\')', 'python', false)).toBe('hit(\'$' + '{1:up}\')'))

      it('handles multiple autocomplete placeholders in Python', () =>
        expect(translateUtils.translateJS('go(\'$' + '{1:up}\', $' + '{2:1})', 'python', false)).toBe('go(\'${1' + ':up}\', $' + '{2:1})'))

      it('handles autocomplete placeholders in Lua', () =>
        expect(translateUtils.translateJS('hit(\'$' + '{1:up}\')', 'lua', false)).toBe('hit(\'$' + '{1:up}\')'))
    })
  })

  describe('translateJS can handle full solutions', () => {
    const unsupported = [
      // Permanent (must write these solutions manually)
      ['lua', 'snowdrops'], // manual rewriting needed for off-by-one error with 1-indexed arrays for row/col in the map
      ['cpp', 'snowdrops'], // row/col literals need to be manually rewritten to x/y for our {x, y} Vector hack
      ['java', 'snowdrops'], // row/col literals need to be manually rewritten to [row, col] arrays, also indexed with [0] and [1]
      // Temporary (should fix the code generation to be smarter)
      ['java', 'libraryTactician'], // Need to auto-detect self-defined function return type
      ['java', 'aFineMint'], // Need to not strip out each hoisted function's start comments
      ['cpp', 'aFineMint'] // Need to not strip out each hoisted function's start comments
    ]
    const targetLanguage = ''
    const targetLevel = ''

    for (const language in solutionsByLanguage) {
      const solutions = solutionsByLanguage[language]
      if (language !== 'javascript') {
        describe(`in ${language}`, () => {
          for (const level in solutions) {
            const code = solutions[level]
            let f
            if (_.find(unsupported, ([lang, lev]) => lang === language && lev === level)) {
              f = xit
            } else if (!targetLevel && !targetLanguage) {
              f = it
            } else if ((targetLevel && level === targetLevel) || (targetLanguage && language === targetLanguage)) {
              f = fit
            } else {
              f = it
            }
            f(`properly translates ${level}`, () => {
              const js = solutionsByLanguage.javascript[level]
              const translated = translateUtils.translateJS(js, language, true)
              const editDistance = levenshteinDistance(translated, code)
              expect(`\n${translated}`).toEqual(`\n${code}`)
              expect(editDistance).toEqual(0)
            })
          }
        })
      }
    }
  })

  describe('translateJS can handle var, let, and const', () => {
    const sourceByLanguage = {
      javascript: `\
var a;
var b = 1;
var c = 2, d = 3;
a = 5;

let e;
let f = 1;
let g = 2, h = 3;
e = 5;

const l = 1;
const m = 2, n = 3;

var i = 1;
let j = 2;
const k = 3;

var x = 4;
let y = 5;
const z = 6;
`,
      cpp: `\
auto a;
auto b = 1;
auto c = 2, auto d = 3;
a = 5;

auto e;
auto f = 1;
auto g = 2, auto h = 3;
e = 5;

const auto l = 1;
const auto m = 2, const auto n = 3;

int i = 1;
int j = 2;
const int k = 3;

float x = 4;
float y = 5;
const float z = 6;
`,
      java: `\
var b = 1;
var c = 2, var d = 3;
var a = 5;

var f = 1;
var g = 2, var h = 3;
var e = 5;

final var l = 1;
final var m = 2, final var n = 3;

int i = 1;
int j = 2;
final int k = 3;

float x = 4;
float y = 5;
final float z = 6;
`,
      python: `\
b = 1
c = 2, d = 3
a = 5

f = 1
g = 2, h = 3
e = 5

l = 1
m = 2, n = 3

i = 1
j = 2
k = 3

x = 4
y = 5
z = 6
`,
      coffeescript: `\
b = 1
c = 2, d = 3
a = 5

f = 1
g = 2, h = 3
e = 5

l = 1
m = 2, n = 3

i = 1
j = 2
k = 3

x = 4
y = 5
z = 6
`,
      lua: `\
local a
local b = 1
local c = 2
local d = 3
a = 5

local e
local f = 1
local g = 2
local h = 3
e = 5

local l = 1
local m = 2
local n = 3

local i = 1
local j = 2
local k = 3

local x = 4
local y = 5
local z = 6
`,
    }

    for (const [language, targetSource] of Object.entries(sourceByLanguage)) {
      // At time of test writing, we don't yet properly handle:
      // 1. java/cpp/lua multiple variable definitions on one line
      // 2. java not able to use `var a` for uninitialized variables
      const func = ['python', 'coffeescript', 'javascript'].includes(language) ? it : xit
      func(`in ${language}`, () => {
        const translated = translateUtils.translateJS(sourceByLanguage.javascript, language, false)
        const editDistance = levenshteinDistance(translated, targetSource)
        if (translated !== targetSource) {
          console.log(`\n${translated}`)
          console.log(`\n${targetSource}`)
        }
        expect(translated).toBe(targetSource)
        expect(editDistance).toEqual(0)
      })
    }
  })

  describe('translateJS can handle empty blocks', () => {
    const sourceByLanguage = {
      javascript: `\
for (let i = 0; i < 5; ++i) {
    
}

for (let j = 0; j < 5; ++j) {
    if (look('right') == 'crab') {
        
    }
    if (look('left') == 'gem') {
        
    }
}

for (let k = 0; k < 5; ++k) {
    
}`,
      cpp: `\
for (int i = 0; i < 5; ++i) {
    
}

for (int j = 0; j < 5; ++j) {
    if (look("right") == "crab") {
        
    }
    if (look("left") == "gem") {
        
    }
}

for (int k = 0; k < 5; ++k) {
    
}`,
      java: `\
for (int i = 0; i < 5; ++i) {
    
}

for (int j = 0; j < 5; ++j) {
    if (look("right") == "crab") {
        
    }
    if (look("left") == "gem") {
        
    }
}

for (int k = 0; k < 5; ++k) {
    
}`,
      python: `\
for i in range(0, 5):
    pass

for j in range(0, 5):
    if look('right') == 'crab':
        pass
    if look('left') == 'gem':
        pass

for k in range(0, 5):
    pass`,
      coffeescript: `\
for i in [0...5]
    

for j in [0...5]
    if look('right') is 'crab'
        
    if look('left') is 'gem'
        

for k in [0...5]
    `,
      lua: `\
for i=1, 5 do
    
end

for j=1, 5 do
    if look('right') == 'crab' then
        
    end
    if look('left') == 'gem' then
        
    end
end

for k=1, 5 do
    
end`,
    }

    for (const [language, targetSource] of Object.entries(sourceByLanguage)) {
      it(`in ${language}`, () => {
        const translated = translateUtils.translateJS(sourceByLanguage.javascript, language, false)
        const editDistance = levenshteinDistance(translated, targetSource)
        if (translated !== targetSource) {
          console.log(`\n${translated}`)
          console.log(`\n${targetSource}`)
        }
        expect(translated).toBe(targetSource)
        expect(editDistance).toEqual(0)
      })
    }
  })

  describe('translateJS can handle empty indented blocks at end of file', () => {
    const sourceByLanguage = {
      javascript: `\
for (let i = 0; i < 5; ++i) {
    for (let j = 0; j < 5; ++j) {
        if (look('right') == 'crab') {
            while (health < 4) {
                
            }
        }
    }
}`,
      cpp: `\
for (int i = 0; i < 5; ++i) {
    for (int j = 0; j < 5; ++j) {
        if (look("right") == "crab") {
            while (health < 4) {
                
            }
        }
    }
}`,
      java: `\
for (int i = 0; i < 5; ++i) {
    for (int j = 0; j < 5; ++j) {
        if (look("right") == "crab") {
            while (health < 4) {
                
            }
        }
    }
}`,
      python: `\
for i in range(0, 5):
    for j in range(0, 5):
        if look('right') == 'crab':
            while health < 4:
                pass`,
      coffeescript: `\
for i in [0...5]
    for j in [0...5]
        if look('right') is 'crab'
            while health < 4
                `,
      lua: `\
for i=1, 5 do
    for j=1, 5 do
        if look('right') == 'crab' then
            while health < 4 do
                
            end
        end
    end
end`,
    }

    for (const [language, targetSource] of Object.entries(sourceByLanguage)) {
      it(`in ${language}`, () => {
        const translated = translateUtils.translateJS(sourceByLanguage.javascript, language, false)
        const editDistance = levenshteinDistance(translated, targetSource)
        if (translated !== targetSource) {
          console.log(`\n${translated}`)
          console.log(`\n${targetSource}`)
        }
        expect(translated).toBe(targetSource)
        expect(editDistance).toEqual(0)
      })
    }
  })
})
