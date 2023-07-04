// API: https://develop.kde.org/docs/extend/plasma/kwin/api/

function toggleScratchpad() {
	var scratchpad;
	print("toggling scratchpad");

	var clients = workspace.clientList();
	for (var i=0; i<clients.length; i++) {
		if (clients[i].resourceName == "scratchpad") {
			scratchpad = clients[i];
			break;
		}
	}
	if (!scratchpad) {
		print("didn't find scratchpad");
		return;
	}

	if (workspace.activeClient == scratchpad) {
		print("minimizing scratchpad");
		scratchpad.minimized = true;
		return;
	}

	print("scratchpad (screen, desktop, activity): (",scratchpad.screen,",", scratchpad.desktop,",",scratchpad.activities,") -> (", workspace.activeScreen,",",workspace.currentDesktop,",",workspace.currentActivity,")");
	print("un-minimizing scratchpad to screen", workspace.activeScreen, "and activity", workspace.currentActivity);
	workspace.sendClientToScreen(scratchpad, workspace.activeScreen);
	scratchpad.desktop = workspace.currentDesktop;
	scratchpad.activities = [workspace.currentActivity];
	workspace.activeClient = scratchpad;
	scratchpad.minimized = false;
	// setMaximize doesn't seem to do what I want it do
	// scratchpad.setMaximize(true, true);
	scratchpad.geometry = workspace.clientArea(2, workspace.activeScreen, workspace.currentDesktop);
}

registerShortcut("Toggle Scratchpad", "Toggle Scratchpad", "Meta+Return", toggleScratchpad);
