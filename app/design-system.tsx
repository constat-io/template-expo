import type { ReactNode } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { colour, radius, space, type } from '../lib/design-system';

// Every component of this app, in every state, drawn from lib/design-system.ts and nothing else. A
// component a screen needs is drawn here first; a look this screen does not have is added to
// lib/design-system.ts, never to the screen.

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={{ gap: space.m }}>
      <Text style={{ fontSize: type.title, fontWeight: type.strong, color: colour.text }}>{title}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.l, alignItems: 'flex-start' }}>{children}</View>
    </View>
  );
}

function State({ name, children }: { name: string; children: ReactNode }) {
  return (
    <View style={{ gap: space.xs, alignItems: 'flex-start' }}>
      {children}
      <Text style={{ fontSize: type.small, color: colour.muted }}>{name}</Text>
    </View>
  );
}

function Button({ label, state }: { label: string; state?: 'pressed' | 'disabled' }) {
  return (
    <Pressable
      disabled={state === 'disabled'}
      style={({ pressed }) => ({
        borderRadius: radius.control,
        paddingVertical: space.s,
        paddingHorizontal: space.l,
        backgroundColor: state === 'disabled' ? colour.line : pressed || state === 'pressed' ? colour.accentPressed : colour.accent,
      })}
    >
      <Text style={{ fontSize: type.body, fontWeight: type.strong, color: state === 'disabled' ? colour.muted : colour.onAccent }}>{label}</Text>
    </Pressable>
  );
}

function Chip({ label, chosen }: { label: string; chosen: boolean }) {
  return (
    <View style={{ borderRadius: radius.pill, borderWidth: 1, borderColor: chosen ? colour.accent : colour.line, backgroundColor: chosen ? colour.accentSoft : colour.surface, paddingVertical: space.xs, paddingHorizontal: space.m }}>
      <Text style={{ fontSize: type.small, color: chosen ? colour.accent : colour.text }}>{label}</Text>
    </View>
  );
}

function Field({ value, placeholder, wrong }: { value?: string; placeholder?: string; wrong?: boolean }) {
  return (
    <TextInput
      defaultValue={value}
      placeholder={placeholder}
      placeholderTextColor={colour.muted}
      style={{ width: 220, fontSize: type.body, color: colour.text, backgroundColor: colour.surface, borderWidth: 1, borderColor: wrong ? colour.danger : colour.line, borderRadius: radius.control, paddingVertical: space.s, paddingHorizontal: space.m }}
    />
  );
}

const card = { backgroundColor: colour.surface, borderWidth: 1, borderColor: colour.line, borderRadius: radius.card, padding: space.l, gap: space.xs } as const;

export default function DesignSystem() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colour.background }} contentContainerStyle={{ padding: space.xl, gap: space.xxl }}>
      <View style={{ gap: space.xs }}>
        <Text style={{ fontSize: type.heading, fontWeight: type.strong, color: colour.text }}>Design system</Text>
        <Text style={{ fontSize: type.body, color: colour.muted }}>Every component, in every state, from lib/design-system.ts.</Text>
      </View>

      <Group title="Header">
        <View style={{ ...card, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', flex: 1 }}>
          <Text style={{ fontSize: type.title, fontWeight: type.strong, color: colour.text }}>A screen’s title</Text>
          <Button label="Its one action" />
        </View>
      </Group>

      <Group title="Button">
        <State name="Ready"><Button label="Save" /></State>
        <State name="Pressed"><Button label="Save" state="pressed" /></State>
        <State name="Not possible yet"><Button label="Save" state="disabled" /></State>
      </Group>

      <Group title="Chip">
        <State name="Not chosen"><Chip label="This week" chosen={false} /></State>
        <State name="Chosen"><Chip label="This week" chosen /></State>
      </Group>

      <Group title="Field">
        <State name="Empty"><Field placeholder="Your name" /></State>
        <State name="Filled"><Field value="Ada Lovelace" /></State>
        <State name="Wrong">
          <Field value="ada@" wrong />
          <Text style={{ fontSize: type.small, color: colour.danger }}>An email has a name after the @.</Text>
        </State>
      </Group>

      <Group title="Card">
        <View style={{ ...card, width: 260 }}>
          <Text style={{ fontSize: type.body, fontWeight: type.strong, color: colour.text }}>A card’s title</Text>
          <Text style={{ fontSize: type.small, color: colour.muted }}>One line about what it holds.</Text>
        </View>
      </Group>

      <Group title="List row">
        <View style={{ ...card, padding: 0, gap: 0, alignSelf: 'stretch', flex: 1 }}>
          {['First row', 'Second row'].map((name, i) => (
            <View key={name} style={{ flexDirection: 'row', alignItems: 'center', gap: space.m, paddingVertical: space.m, paddingHorizontal: space.l, borderTopWidth: i ? 1 : 0, borderTopColor: colour.line }}>
              <Text style={{ flex: 1, fontSize: type.body, color: colour.text }}>{name}</Text>
              <Text style={{ fontSize: type.small, color: colour.muted }}>Detail</Text>
              <Text style={{ color: colour.muted }}>›</Text>
            </View>
          ))}
        </View>
      </Group>

      <Group title="Tab bar">
        <View style={{ flexDirection: 'row', gap: space.xs, backgroundColor: colour.surface, borderWidth: 1, borderColor: colour.line, borderRadius: radius.card, padding: space.xs }}>
          {['Home', 'Search', 'You'].map((name, i) => (
            <View key={name} style={{ paddingVertical: space.s, paddingHorizontal: space.l, borderRadius: radius.control, backgroundColor: i === 0 ? colour.accentSoft : 'transparent' }}>
              <Text style={{ fontSize: type.small, fontWeight: i === 0 ? type.strong : type.regular, color: i === 0 ? colour.accent : colour.muted }}>{name}</Text>
            </View>
          ))}
        </View>
      </Group>
    </ScrollView>
  );
}
